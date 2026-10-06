import express, { Application } from 'express';
import { config } from './config';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes (will be added in later milestones)
app.get('/', (req, res) => {
  res.json({ message: 'CareConnect API' });
});

export default app;
