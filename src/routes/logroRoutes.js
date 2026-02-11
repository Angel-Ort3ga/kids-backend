import express from "express";
import { crearLogro, obtenerLogros } from "../controllers/logroController.js";
import { verLogrosDelNino } from "../controllers/progresoController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

console.log("🔥 logroRoutes cargado");
const router = express.Router();

// Crear logro
router.post("/", crearLogro);

// Obtener logros
router.get("/", obtenerLogros);

router.get("/mios", authMiddleware, verLogrosDelNino);
export default router;
