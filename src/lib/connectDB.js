const { MongoClient, ServerApiVersion } = require("mongodb");

let db;

const connectDB = async () => {
  if (db) return db;

  const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

  try {
    const client = new MongoClient(uri, {
      ssl: true,
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      tlsAllowInvalidCertificates: true,
    });

    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");
    db = client.db("Sazzadul_Islam_Website");
    return db;
  } catch (error) {
    // Detailed error handling
    if (error.message.includes("authentication")) {
      console.error("❌ Authentication failed: Check username/password");
    } else if (
      error.message.includes("ENOTFOUND") ||
      error.message.includes("ECONNREFUSED")
    ) {
      console.error(
        "❌ Network error: Cannot reach MongoDB Atlas. Check IP whitelist or network"
      );
    } else if (
      error.message.includes("TLS") ||
      error.message.includes("certificate")
    ) {
      console.error("❌ TLS/SSL error: Certificate problem");
    } else {
      console.error("❌ Unknown error:", error.message);
    }
    throw new Error("Database connection failed");
  }
};

export default connectDB;
