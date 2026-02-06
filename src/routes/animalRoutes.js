import express from "express";
import {
  crearAnimal,
  obtenerAnimales,
} from "../controllers/animalController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

// 🟢 Ver animales (NIÑO y PADRE)
router.get("/", authMiddleware, obtenerAnimales);

// 🔒 Crear animal (SOLO PADRE)
router.post("/", authMiddleware, roleMiddleware(["PADRE"]), crearAnimal);

export default router;
