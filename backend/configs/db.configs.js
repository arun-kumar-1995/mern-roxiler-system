import mongoose from "mongoose";
import dotenv from "dotenv/config";

const connectionString = process.env.MONGODB_URI;
const connectDB = async () => {
  try {
    if (!connectionString) {
      throw new Error("Invalid connection string");
    }

    const conn = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.DB_NAME,
    });

    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("Couldn't connect to database", err);
  }
};

export default connectDB;
