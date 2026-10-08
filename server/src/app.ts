import express, { Application } from "express";
import { config } from "./config";
import healthRoutes from "./routes/health";
import authRoutes from "./routes/auth";
import protectedRoutes from "./routes/protected";

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
app.use("/api/protected", protectedRoutes);

export default app;
