import jwt from "jsonwebtoken";

// 🔐 Verificar token
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No hay token" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token inválido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // 👈 usamos req.user en todo el proyecto
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido" });
  }
};

// 👨‍👩‍👧 Middleware de roles
export const roleMiddleware = (rolesPermitidos = []) => {
  return (req, res, next) => {
    if (!req.user || !rolesPermitidos.includes(req.user.rol)) {
      return res.status(403).json({
        message: "No tienes permisos para acceder a esta ruta",
      });
    }

    next();
  };
};