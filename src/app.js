import express from "express";
import authRoutes from "./routes/authRoutes.js";
import animalRoutes from "./routes/animalRoutes.js";
import progresoRoutes from "./routes/progresoRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/animals", animalRoutes);

app.use("/api/progreso", progresoRoutes);

export default app;
