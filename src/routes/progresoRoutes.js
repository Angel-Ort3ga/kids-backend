import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { guardarProgreso, verProgreso } from "../controllers/progresoController.js";

const router = Router();

router.post("/", authMiddleware, guardarProgreso);
router.get("/", authMiddleware, verProgreso);

export default router;
