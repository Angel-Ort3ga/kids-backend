import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { guardarProgreso, verProgreso, subirNivel, dashboard} from "../controllers/progresoController.js";

const router = Router();

router.post("/", authMiddleware, guardarProgreso);
router.get("/", authMiddleware, verProgreso);
router.post("/subir-nivel", authMiddleware, subirNivel);
router.get("/dashboard", authMiddleware, dashboard);

export default router;
