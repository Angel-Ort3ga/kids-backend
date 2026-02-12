import express from "express";
import { obtenerContenido } from "../controllers/contenidoController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, obtenerContenido);

export default router;
