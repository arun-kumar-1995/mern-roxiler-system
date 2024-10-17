import express from "express";
import dotenv from "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.configs.js";
import scheduleCronJob from "./services/cronJob/cronJob.services.js";
const app = express();

const { PORT = 8000 } = process.env;

// cors
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// start the server only when db connected

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log("listening on port  " + PORT);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

await startServer();

// fetch seed data
await scheduleCronJob();

// routes
import appRoutes from "./routes/app.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

// define routes
app.use("/app/v1", appRoutes);

app.use(errorMiddleware);
