import express from "express";
import { crearLogro, obtenerLogros } from "../controllers/logroController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();
console.log("🔥 logroRoutes cargado");

// Crear logro
router.post("/", crearLogro);

// Obtener logros
router.get("/", obtenerLogros);

export default router;
