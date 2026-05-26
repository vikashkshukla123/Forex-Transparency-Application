import express from "express";
import cors from "cors";

import transactionRoutes from "./routes/transactionRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";

const app = express();

// Middleware
app.use(express.json());

app.use(cors());

// Routes
app.use("/api/transactions", transactionRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/chatbot", chatbotRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("API Working");
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

export default app;