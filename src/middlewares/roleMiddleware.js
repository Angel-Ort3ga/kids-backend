export const isPadre = (req, res, next) => {
  if (req.user.rol !== "PADRE") {
    return res.status(403).json({ message: "Acceso solo para PADRES" });
  }
  next();
};

export const isNino = (req, res, next) => {
  if (req.user.rol !== "NINO") {
    return res.status(403).json({ message: "Acceso solo para NIÑOS" });
  }
  next();
};
const roleMiddleware = (rolesPermitidos = []) => {
  return (req, res, next) => {
    if (!req.user || !rolesPermitidos.includes(req.user.rol)) {
      return res.status(403).json({
        message: "No tienes permisos para acceder a esta ruta",
      });
    }
    next();
  };
};

export default roleMiddleware;
