export default function errorHandler(err, req, res, next) {
  console.error("ERROR:", err.stack);
  res.status(500).json({ message: "Error interno del servidor" });
}
