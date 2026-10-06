import express, { Application } from "express";
import { config } from "./config";
import healthRoutes from "./routes/health";
import authRoutes from "./routes/auth";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "CareConnect API" });
});

app.use("/health", healthRoutes);
app.use("/api/auth", authRoutes);

export default app;
