import Progreso from "../models/Progreso.js";
import Animal from "../models/Animal.js";
import Logro from "../models/Logro.js";
import User from "../models/User.js";

export const guardarProgreso = async (req, res) => {
  try {
    console.log("USUARIO:", req.usuario);
    console.log("BODY:", req.body);

    const progreso = await Progreso.findOneAndUpdate(
      { usuario: req.usuario.id },
      {
        nivelActual: req.body.nivelActual,
        animalesDesbloqueados: req.body.animalesDesbloqueados
      },
      {
        new: true,
        upsert: true
      }
    );

    res.json(progreso);
  } catch (error) {
    console.error("🔥 ERROR REAL COMPLETO:", error);

    res.status(400).json({
      message: error.message
    });
  }
};

export const verProgreso = async (req, res) => {
  try {
    const progreso = await Progreso.findOne({
      usuario: req.usuario.id
    }).populate("animalesDesbloqueados", "nombre imagen nivel");

    if (!progreso) {
      return res.status(404).json({ message: "Progreso no encontrado" });
    }

    res.json(progreso);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener progreso" });
  }
};

// 🧒 Subir nivel del niño
 export const subirNivel = async (req, res) => {
  try {
    const progreso = await Progreso.findOne({ usuario: req.usuario.id });

    if (!progreso) {
      return res.status(404).json({ message: "Progreso no encontrado" });
    }

    // 🔼 Subir nivel
    progreso.nivelActual += 1;

    // 🐾 Obtener animales desbloqueables
    const animales = await Animal.find({
      nivel: { $lte: progreso.nivelActual }
    });

    // 🧠 Guardar solo los IDs
    progreso.animalesDesbloqueados = animales.map(a => a._id);

    await progreso.save();

    res.json({
      message: "Nivel aumentado y animales desbloqueados",
      nivelActual: progreso.nivelActual,
      animalesDesbloqueados: animales,
      logrosDesbloqueados: progreso.logrosDesbloqueados
    });
  } catch (error) {
    console.error("ERROR SUBIR NIVEL:", error);
    res.status(500).json({ message: "Error al subir nivel" });
  }
};

export const verLogrosDelNino = async (req, res) => {
  try {
    const progreso = await Progreso.findOne({
      usuario: req.usuario.id
    }).populate("logrosDesbloqueados");

    if (!progreso) {
      return res.status(404).json({ message: "Progreso no encontrado" });
    }

    res.json({
      total: progreso.logrosDesbloqueados.length,
      logros: progreso.logrosDesbloqueados
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener logros" });
  }
};

export const dashboard = async (req, res) => {
  try {
    const usuario = await User.findById(req.usuario.id);

    const progreso = await Progreso.findOne({
      usuario: req.usuario.id
    });

    if (!progreso) {
      return res.status(404).json({ message: "Progreso no encontrado" });
    }

    const totalAnimales = await Animal.countDocuments();
    const totalLogros = await Logro.countDocuments();

    const porcentajeProgreso = Math.round(
      (progreso.animalesDesbloqueados.length / totalAnimales) * 100
    );

    res.json({
      usuario: usuario.nombre,
      nivelActual: progreso.nivelActual,
      animalesDesbloqueados: progreso.animalesDesbloqueados.length,
      totalAnimales,
      logrosDesbloqueados: progreso.logrosDesbloqueados.length,
      totalLogros,
      porcentajeProgreso
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en dashboard" });
  }
};