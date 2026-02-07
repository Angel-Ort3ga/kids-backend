import express from "express";

import authRoutes from "./routes/authRoutes.js";
import progresoRoutes from "./routes/progresoRoutes.js";
import animalRoutes from "./routes/animalRoutes.js";

const app = express();

// Middleware para JSON
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/progreso", progresoRoutes);
app.use("/api/animales", animalRoutes);

export default app;
