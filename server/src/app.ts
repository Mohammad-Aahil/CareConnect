import express, { Application } from "express";
import { config } from "./config";
import healthRoutes from "./routes/health";
import authRoutes from "./routes/auth";
import protectedRoutes from "./routes/protected";
import adminRoutes from "./routes/admin";
import doctorRoutes from "./routes/doctors";
import availabilityRoutes from "./routes/availability";
import appointmentRoutes from "./routes/appointments";
import notificationRoutes from "./routes/notifications";

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
app.use("/api/admin", adminRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/notifications", notificationRoutes);

export default app;
