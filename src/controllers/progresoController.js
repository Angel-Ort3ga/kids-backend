import Progreso from "../models/Progreso.js";

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
    }).populate("animalesDesbloqueados");

    if (!progreso) {
      return res.status(404).json({ message: "Progreso no encontrado" });
    }

    res.json(progreso);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener progreso" });
  }
};

