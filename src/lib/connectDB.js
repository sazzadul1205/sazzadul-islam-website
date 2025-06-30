const { MongoClient, ServerApiVersion } = require("mongodb");

let db;

const connectDB = async () => {
  if (db) return db;

  try {
    const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

    const client = new MongoClient(uri, {
      ssl: true,
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      tlsAllowInvalidCertificates: true, // Allows invalid certificates (if needed for development)
    });

    await client.connect();
    console.log("Connected to MongoDB Atlas");

    db = client.db("Sazzadul-Islam-Website");
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    throw new Error("Database connection failed");
  }
};
