import express from "express";
import { register, login, perfil } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/perfil", authMiddleware, perfil);

// PADRE
router.get(
  "/solo-padre",
  authMiddleware,
  roleMiddleware(["PADRE"]),
  (req, res) => {
    res.json({ message: "Bienvenido padre 👨‍👩‍👧" });
  },
);

export default router;
