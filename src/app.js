import express from "express";
import cors from "cors";
import contenidoRoutes from "./routes/contenidoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import progresoRoutes from "./routes/progresoRoutes.js";
import logroRoutes from "./routes/logroRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// Configuración de CORS
app.use(cors({
  origin: "http://localhost:5173", // 👈 tu frontend (Vite usa 5173 por defecto)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.get("/ping", (req, res) => res.json({ ok: true }));

// Rutas
app.use("/api/contenido", contenidoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/progreso", progresoRoutes);
app.use("/api/logros", logroRoutes);

// Middleware global de errores
app.use(errorHandler);

export default app;
