import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import contenidoRoutes from "./routes/contenidoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import progresoRoutes from "./routes/progresoRoutes.js";
import logroRoutes from "./routes/logroRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// Configuración de CORS dinámica
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());

// Conexión a Mongo Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error de conexión a Mongo:", err));

app.get("/ping", (req, res) => res.json({ ok: true }));

// Rutas
app.use("/api/contenido", contenidoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/progreso", progresoRoutes);
app.use("/api/logros", logroRoutes);

// Middleware global de errores
app.use(errorHandler);

// Puerto dinámico para Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

export default app;
