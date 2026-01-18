import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from './config/db';

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import ClubRoutes from "./routes/ClubRoutes";
import eventRoutes from "./routes/eventRoutes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

console.log("🔍 Checking environment variables...");
console.log("PORT:", PORT);
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
// Updated to use local MongoDB on port 27018

app.use(cors());
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.path} - Body:`, req.body);
    next();
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/clubs", ClubRoutes);
app.use("/api/events", eventRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("UniNexus API is running...");
});

app.get("/api/health", (req: Request, res: Response) => {
  res.json({ message: "Connected! Backend is running." });
});

const startServer = async () => {
  // Start server first
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
  
  // Then try to connect to MongoDB
  await connectDB();
};

startServer();
