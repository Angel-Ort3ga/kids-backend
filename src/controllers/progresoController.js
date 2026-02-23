import Progreso from "../models/Progreso.js";
import User from "../models/User.js";
import Contenido from "../models/Contenido.js";
import { evaluarLogros } from "./logroController.js";

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

    await evaluarLogros(progreso);

    await progreso.save();

    res.json({
      message: "Nivel aumentado",
      nivelActual: progreso.nivelActual,
      logros: progreso.logrosDesbloqueados,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al subir nivel" });
  }
};


export const dashboard = async (req, res) => {
  try {
    if (req.usuario.rol !== "PADRE") {
      return res.status(403).json({ message: "Solo padres pueden ver este panel" });
    }

    const hijos = await User.find({
      padre: req.usuario.id,
      rol: "NINO",
    });

    const resultado = [];

    for (const hijo of hijos) {
      const progreso = await Progreso.findOne({ usuario: hijo._id });
      const totalContenido = await Contenido.countDocuments();
      const desbloqueados = await Contenido.find({
        nivel: { $lte: progreso.nivelActual },
      });

      const porcentaje = Math.round(
        (desbloqueados.length / totalContenido) * 100
      );

      resultado.push({
        nombre: hijo.nombre,
        nivelActual: progreso.nivelActual,
        porcentaje,
        logros: progreso.logrosDesbloqueados.length,
      });
    }

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en dashboard" });
  }
};

export const perfil = async (req, res) => {
  try {
    const usuario = await User.findById(req.usuario.id);

    // 🔵 PADRE
    if (usuario.rol === "PADRE") {
      const hijos = await User.find({ padre: usuario._id });

      const resultado = [];

      for (const hijo of hijos) {
        const progreso = await Progreso.findOne({ usuario: hijo._id });

        resultado.push({
          nombre: hijo.nombre,
          nivelActual: progreso?.nivelActual || 1,
          logros: progreso?.logrosDesbloqueados.length || 0,
        });
      }

      return res.json({
        tipo: "PADRE",
        nombre: usuario.nombre,
        hijos: resultado,
      });
    }

    // 🟢 NIÑO
    if (usuario.rol === "NINO") {
      const progreso = await Progreso.findOne({ usuario: usuario._id });
      const totalContenido = await Contenido.countDocuments();
      const desbloqueados = await Contenido.find({
        nivel: { $lte: progreso.nivelActual },
      });

      const porcentaje = Math.round(
        (desbloqueados.length / totalContenido) * 100
      );

      return res.json({
        tipo: "NINO",
        nombre: usuario.nombre,
        nivelActual: progreso.nivelActual,
        porcentaje,
        logros: progreso.logrosDesbloqueados.length,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en perfil" });
  }
};