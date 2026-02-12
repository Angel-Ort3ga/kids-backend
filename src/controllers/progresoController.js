import Progreso from "../models/Progreso.js";
import User from "../models/User.js";
import Contenido from "../models/Contenido.js";

const crearProgresoSiNoExiste = async (usuarioId) => {
  let progreso = await Progreso.findOne({ usuario: usuarioId });

  if (!progreso) {
    progreso = await Progreso.create({
      usuario: usuarioId,
      nivelActual: 1,
    });
  }

  return progreso;
};

export const verProgreso = async (req, res) => {
  try {
    const progreso = await crearProgresoSiNoExiste(req.usuario.id);
    res.json(progreso);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener progreso" });
  }
};

export const subirNivel = async (req, res) => {
  try {
    const progreso = await crearProgresoSiNoExiste(req.usuario.id);

    progreso.nivelActual += 1;
    await progreso.save();

    res.json({
      message: "Nivel aumentado",
      nivelActual: progreso.nivelActual,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al subir nivel" });
  }
};

export const dashboard = async (req, res) => {
  try {
    const usuario = await User.findById(req.usuario.id);
    const progreso = await crearProgresoSiNoExiste(req.usuario.id);

    const totalContenido = await Contenido.countDocuments();

    const desbloqueados = await Contenido.countDocuments({
      nivel: { $lte: progreso.nivelActual },
    });

    const porcentajeProgreso = Math.round(
      (desbloqueados / totalContenido) * 100
    );

    res.json({
      usuario: usuario.nombre,
      nivelActual: progreso.nivelActual,
      contenidoDesbloqueado: desbloqueados,
      totalContenido,
      porcentajeProgreso,
    });
  } catch (error) {
    res.status(500).json({ message: "Error en dashboard" });
  }
};