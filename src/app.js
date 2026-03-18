import express from "express";
import cors from "cors";
import contenidoRoutes from "./routes/contenidoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import progresoRoutes from "./routes/progresoRoutes.js";
import logroRoutes from "./routes/logroRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// Configuración de CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://kisdgame.netlify.app"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(null, false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use((req, res, next) => {
  console.log("Origin:", req.headers.origin);
  next();
});

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
