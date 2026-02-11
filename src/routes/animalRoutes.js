import express from "express";
import { crearAnimal, obtenerAnimales } from "../controllers/animalController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Crear animal (solo pruebas / seed)
router.post("/", crearAnimal);

// Niño ve animales (REQUIERE TOKEN)
router.get("/", authMiddleware, obtenerAnimales);

export default router;
