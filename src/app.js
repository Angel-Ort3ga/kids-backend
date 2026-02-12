import express from "express";
import contenidoRoutes from "./routes/contenidoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import progresoRoutes from "./routes/progresoRoutes.js";
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
app.use("/api/contenido", contenidoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/progreso", progresoRoutes);
app.use("/api/logros", logroRoutes);

export default app;
