import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Crucial: allows your frontend to talk to this backend
app.use(express.json());

// A simple test route
app.get("/api/test", (req: Request, res: Response) => {
  res.json({ message: "Hello from the UniNexus Backend! 🚀" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
