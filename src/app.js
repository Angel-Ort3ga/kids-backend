import express from "express";

import authRoutes from "./routes/authRoutes.js";
import progresoRoutes from "./routes/progresoRoutes.js";
import animalRoutes from "./routes/animalRoutes.js";
import logroRoutes from "./routes/logroRoutes.js";

const app = express();

// Middleware para JSON
app.use(express.json());

app.get("/prueba", (req, res) => {
  res.json({ ok: true });
});
app.get("/ping", (req, res) => {
  res.json({ ok: true });
});
// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/progreso", progresoRoutes);
app.use("/api/animales", animalRoutes);
app.use("/api/logros", logroRoutes);

export default app;
