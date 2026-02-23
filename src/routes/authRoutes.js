import express from "express";
import { register, registerPadre, login, crearNino } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/register-padre", registerPadre);
router.post("/register-padre", registerPadre);
// PADRE
router.get(
  "/solo-padre",
  authMiddleware,
  roleMiddleware(["PADRE"]),
  (req, res) => {
    res.json({ message: "Bienvenido padre 👨‍👩‍👧" });
  },
);
router.post("/crear-nino", authMiddleware, crearNino);


export default router;
