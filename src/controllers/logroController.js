import Logro from "../models/Logro.js";

export const evaluarLogros = async (progreso) => {
  const logros = await Logro.find();
  const nuevosLogros = [];

  for (const logro of logros) {
    if (progreso.logrosDesbloqueados.includes(logro._id)) continue;

    if (logro.condicion === `nivel_${progreso.nivelActual}`) {
      nuevosLogros.push(logro._id);
    }
  }

  progreso.logrosDesbloqueados.push(...nuevosLogros);
};

// Crear logro
export const crearLogro = async (req, res) => {
  try {
    const logro = new Logro(req.body);
    await logro.save();
    res.status(201).json(logro);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error al crear logro" });
  }
};

// Obtener logros
export const obtenerLogros = async (req, res) => {
  try {
    const logros = await Logro.find();
    res.json(logros);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener logros" });
  }
};