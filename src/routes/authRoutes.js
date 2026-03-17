import express from "express";
import { register, login, crearNino , changePassword } from "../controllers/authController.js";
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/crear-nino", authMiddleware, roleMiddleware(["PADRE"]), crearNino);
router.post("/change-password", authMiddleware, changePassword);

router.get(
  "/solo-padre",
  authMiddleware,
  roleMiddleware(["PADRE"]),
  (req, res) => res.json({ message: "Bienvenido padre 👨‍👩‍👧" })
);

export default router;
