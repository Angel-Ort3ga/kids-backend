import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {verProgreso, subirNivel, dashboard, perfil} from "../controllers/progresoController.js";

const router = Router();

router.get("/", authMiddleware, verProgreso);
router.post("/subir-nivel", authMiddleware, subirNivel);
router.get("/dashboard", authMiddleware, dashboard);
router.get("/perfil", authMiddleware, perfil)

export default router;
