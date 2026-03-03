const { MongoClient, ServerApiVersion } = require("mongodb");

// Global variables to maintain connection state
let client = null;
let db = null;
let isConnecting = false;
let keepAliveInterval = null;

/**
 * Creates all necessary indexes for optimal performance
 * @param {Db} db - MongoDB database instance
 */
const createIndexes = async (db) => {
  try {
    console.log("🔍 Checking and creating indexes...");

    // Projects Collection Indexes
    const projectsCollection = db.collection("Projects");
    const projectsIndexes = await projectsCollection.indexes();

    const projectIndexes = [
      { key: { order: 1 }, name: "order_index" },
      { key: { title: 1 }, name: "title_index" },
      { key: { status: 1 }, name: "status_index" },
      { key: { year: -1 }, name: "year_index" },
      { key: { view: -1 }, name: "view_index" },
      { key: { createdAt: -1 }, name: "createdAt_index" },
    ];

    for (const index of projectIndexes) {
      const exists = projectsIndexes.some((i) => i.name === index.name);
      if (!exists) {
        console.log(`📌 Creating index: ${index.name}...`);
        await projectsCollection.createIndex(index.key, { name: index.name });
        console.log(`✅ Index ${index.name} created`);
      }
    }

    // Skills Collection Indexes (if you have one)
    const skillsCollection = db.collection("Skills");
    if (skillsCollection) {
      const skillsIndexes = await skillsCollection.indexes();
      const skillIndexes = [
        { key: { category: 1 }, name: "skill_category_index" },
        { key: { name: 1 }, name: "skill_name_index" },
      ];

      for (const index of skillIndexes) {
        const exists = skillsIndexes.some((i) => i.name === index.name);
        if (!exists) {
          console.log(`📌 Creating index: ${index.name}...`);
          await skillsCollection.createIndex(index.key, { name: index.name });
          console.log(`✅ Index ${index.name} created`);
        }
      }
    }

    console.log("✅ All database indexes verified/created successfully");
  } catch (error) {
    console.error("❌ Error creating indexes:", error);
    console.error(
      "⚠️ Some indexes may be missing. Performance might be affected.",
    );
  }
};

/**
 * Establishes connection to MongoDB with retry logic
 * @param {number} retries - Number of retry attempts remaining
 * @returns {Promise<Db>} MongoDB database instance
 */
const connectDB = async (retries = 5) => {
  // If we already have a valid connection, return it immediately
  if (db) {
    console.log("📊 Using existing database connection");
    return db;
  }

  // Prevent multiple functions from trying to connect simultaneously
  if (isConnecting) {
    console.log("⏳ Connection already in progress, waiting...");
    // Wait for connection to complete
    while (isConnecting) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    if (db) return db;
  }

  const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

  if (!uri) {
    throw new Error(
      "❌ NEXT_PUBLIC_MONGODB_URI environment variable is not defined",
    );
  }

  try {
    isConnecting = true;
    console.log("⏳ Connecting to MongoDB Atlas...");

    // Create MongoDB client with optimized configuration
    client = new MongoClient(uri, {
      ssl: true,
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      tlsAllowInvalidCertificates: process.env.NODE_ENV === "development",
      // Connection pool settings for optimal performance
      maxPoolSize: 10, // Maximum 10 concurrent connections
      minPoolSize: 2, // Keep at least 2 connections ready
      maxIdleTimeMS: 30000, // Close idle connections after 30 seconds
      serverSelectionTimeoutMS: 10000, // Timeout after 10s if server not found
      socketTimeoutMS: 45000, // Socket operations timeout after 45s
      connectTimeoutMS: 10000, // Connection timeout after 10s
      retryWrites: true,
      retryReads: true,
      w: "majority", // Write concern for durability
    });

    // Attempt to establish connection
    await client.connect();

    // Get the specific database instance
    db = client.db("Sazzadul_Islam_Website");

    console.log("✅ Successfully connected to MongoDB Atlas");

    // Test the connection with a simple ping
    await db.command({ ping: 1 });
    console.log("📡 Database ping successful");

    // Create indexes in the background (don't await to not block startup)
    createIndexes(db).catch((err) => {
      console.error("⚠️ Background index creation warning:", err.message);
    });

    // Monitor for connection close events
    client.on("close", () => {
      console.warn("⚠️ MongoDB connection closed unexpectedly");
      db = null;
      client = null;
    });

    // Monitor for connection errors
    client.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err.message);
      db = null;
      client = null;
    });

    // Monitor for reconnection events
    client.on("reconnect", () => {
      console.log("🔄 MongoDB reconnected successfully");
    });

    return db;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);

    // Detailed error handling
    if (
      error.message.includes("authentication") ||
      error.message.includes("Auth")
    ) {
      console.error(
        "   → Authentication failed: Check username and password in connection string",
      );
    } else if (
      error.message.includes("ENOTFOUND") ||
      error.message.includes("getaddrinfo")
    ) {
      console.error(
        "   → Network error: Cannot reach MongoDB Atlas. Check your internet connection",
      );
      console.error(
        "   → Also verify that your IP is whitelisted in MongoDB Atlas",
      );
    } else if (
      error.message.includes("TIMEOUT") ||
      error.message.includes("timeout")
    ) {
      console.error(
        "   → Connection timeout: Server is taking too long to respond",
      );
    } else if (
      error.message.includes("TLS") ||
      error.message.includes("SSL") ||
      error.message.includes("certificate")
    ) {
      console.error("   → TLS/SSL error: Certificate validation failed");
    }

    // Retry logic for network-related errors
    if (
      retries > 0 &&
      (error.message.includes("ENOTFOUND") ||
        error.message.includes("TIMEOUT") ||
        error.message.includes("timeout"))
    ) {
      console.log(`🔄 Retrying connection... (${retries} attempts left)`);
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 3 seconds
      isConnecting = false; // Reset flag for retry
      return connectDB(retries - 1);
    }

    throw new Error(`Database connection failed: ${error.message}`);
  } finally {
    isConnecting = false;
  }
};

/**
 * Safely retrieves database connection, establishing it if necessary
 * @returns {Promise<Db>} MongoDB database instance
 */
const getDB = async () => {
  if (!db) {
    await connectDB();
  }
  return db;
};

/**
 * Starts periodic ping to prevent MongoDB Atlas from timing out
 * @param {number} intervalMinutes - Minutes between pings
 */
const startKeepAlive = (intervalMinutes = 20) => {
  if (keepAliveInterval) return;

  keepAliveInterval = setInterval(
    async () => {
      try {
        if (db) {
          await db.command({ ping: 1 });
          console.log(
            "🔄 Keep-alive ping sent at",
            new Date().toLocaleTimeString(),
          );
        }
      } catch (err) {
        console.warn("⚠️ Keep-alive failed, attempting to reconnect...");
        db = null;
        client = null;
        await connectDB().catch((e) =>
          console.error("Reconnection failed:", e.message),
        );
      }
    },
    intervalMinutes * 60 * 1000,
  );

  console.log(`🟢 Keep-alive started (every ${intervalMinutes} minutes)`);
};

/**
 * Stops the keep-alive interval
 */
const stopKeepAlive = () => {
  if (keepAliveInterval) {
    clearInterval(keepAliveInterval);
    keepAliveInterval = null;
    console.log("🛑 Keep-alive stopped");
  }
};

/**
 * Gracefully closes database connection
 */
const closeDB = async () => {
  stopKeepAlive();

  if (client) {
    try {
      await client.close();
      console.log("🔒 MongoDB connection closed gracefully");
    } catch (error) {
      console.error("❌ Error closing MongoDB connection:", error.message);
    } finally {
      db = null;
      client = null;
    }
  }
};

/**
 * Check database health
 * @returns {Promise<Object>} Health status
 */
const checkHealth = async () => {
  try {
    const dbInstance = await getDB();
    await dbInstance.command({ ping: 1 });

    // Get connection pool stats
    const poolStats = client?.options
      ? {
          maxPoolSize: client.options.maxPoolSize,
          minPoolSize: client.options.minPoolSize,
        }
      : {};

    return {
      status: "healthy",
      connected: true,
      timestamp: new Date().toISOString(),
      database: "Sazzadul_Islam_Website",
      ...poolStats,
    };
  } catch (error) {
    return {
      status: "unhealthy",
      connected: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
};

/**
 * Creates a transaction session
 * @returns {Promise<ClientSession>} MongoDB session
 */
const startTransaction = async () => {
  if (!client) throw new Error("MongoDB client not initialized");

  const session = client.startSession();
  session.startTransaction();
  return session;
};

// Handle application shutdown
if (typeof process !== "undefined") {
  process.on("SIGINT", async () => {
    console.log("\n📴 Received SIGINT signal");
    await closeDB();
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    console.log("\n📴 Received SIGTERM signal");
    await closeDB();
    process.exit(0);
  });

  // Handle uncaught errors
  process.on("uncaughtException", (err) => {
    console.error("❌ Uncaught Exception:", err);
    closeDB().finally(() => process.exit(1));
  });

  process.on("unhandledRejection", (reason) => {
    console.error("❌ Unhandled Rejection:", reason);
  });
}

export default connectDB;
export {
  getDB,
  closeDB,
  startKeepAlive,
  stopKeepAlive,
  checkHealth,
  startTransaction,
  createIndexes,
};
