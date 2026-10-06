import express, { Application } from "express";
import { config } from "./config";
import healthRoutes from "./routes/health";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "CareConnect API" });
});

app.use("/health", healthRoutes);

export default app;
