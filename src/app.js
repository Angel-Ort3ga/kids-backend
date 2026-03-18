import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import seed from "./seed/contenidoSeed.js";
import contenidoRoutes from "./routes/contenidoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import progresoRoutes from "./routes/progresoRoutes.js";
import logroRoutes from "./routes/logroRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// Configuración de CORS dinámica
const allowedOrigins = [
  "http://localhost:5173",
  "https://kisdgame.netlify.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());

// Conexión a Mongo Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error de conexión a Mongo:", err));
if (process.env.RUN_SEED === "true") {
      await seed(); // ejecuta tu seed
      console.log("Seed ejecutado");
    }

app.get("/ping", (req, res) => res.json({ ok: true }));

// Rutas
app.use("/api/contenido", contenidoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/progreso", progresoRoutes);
app.use("/api/logros", logroRoutes);

// Middleware global de errores
app.use(errorHandler);

export default app;
