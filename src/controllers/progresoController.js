import Progreso from "../models/Progreso.js";

// 🧒 Niño guarda progreso
export const guardarProgreso = async (req, res) => {
  try {
    const progreso = await Progreso.findOneAndUpdate(
      {
        nino: req.usuario.id,
        modulo: req.body.modulo,
      },
      req.body,
      { new: true, upsert: true },
    );

    res.json(progreso);
  } catch (error) {
    console.error("ERROR REAL:", error.message);

    res.status(400).json({ message: "Error al guardar progreso" });
  }
};

// 👨‍👩‍👦 Padre ve progreso
export const verProgreso = async (req, res) => {
  try {
    const progreso = await Progreso.find({ nino: req.params.id }).populate(
      "nino",
      "nombre",
    );

    res.json(progreso);
  } catch (error) {
    console.error("ERROR REAL:", error.message);

    res.status(500).json({ message: "Error al obtener progreso" });
  }
};
