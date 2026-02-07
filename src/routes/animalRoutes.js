import express from "express";
import { crearAnimal, obtenerAnimales } from "../controllers/animalController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// SOLO para cargar animales (temporal)
router.post("/", crearAnimal);

// Niño ve animales desbloqueados (REQUIERE TOKEN)
router.get("/", authMiddleware, obtenerAnimales);

export default router;
