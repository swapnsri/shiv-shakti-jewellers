import mongoose from "mongoose";

const { username, password } = process.env;

const connectionStr = `mongodb+srv://${username}:${password}@shivshakti-cluster0.vjon1.mongodb.net/SSO?retryWrites=true&w=majority&appName=ShivShakti-Cluster0`;

declare global {
  var mongoose: any;
}

// Ensure that the connection string is defined
if (!connectionStr) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

// Use global caching for the Mongoose connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  // If a cached connection exists, use it
  if (cached.conn) {
    console.log("Using cached database connection.");
    return cached.conn;
  }

  // If no connection promise is cached, create one
  if (!cached.promise) {
    console.log("No cached connection found. Creating a new connection...");
    cached.promise = mongoose
      .connect(connectionStr)
      .then((mongoose) => {
        console.log("Database connection successful.");
        return mongoose;
      })
      .catch((error) => {
        console.error("Database connection failed:", error);
        throw error;
      });
  }

  try {
    // Await the promise to complete the connection
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error("Failed to establish a database connection:", error);
    throw error;
  }
}
