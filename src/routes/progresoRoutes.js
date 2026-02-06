import express from "express";
import {
  guardarProgreso,
  verProgreso,
} from "../controllers/progresoController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

// 🧒 Niño actualiza progreso
router.post("/", authMiddleware, roleMiddleware(["NINO"]), guardarProgreso);

// 👨‍👩‍👦 Padre ve progreso del niño
router.get("/:id", authMiddleware, roleMiddleware(["PADRE"]), verProgreso);

export default router;
