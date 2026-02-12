import Contenido from "../models/Contenido.js";
import Progreso from "../models/Progreso.js";

export const obtenerContenido = async (req, res) => {
  try {
    const { tipo } = req.query;

    let nivelUsuario = 1;

    const progreso = await Progreso.findOne({
      usuario: req.usuario.id,
    });

    if (progreso) {
      nivelUsuario = progreso.nivelActual;
    }

    const filtro = {
      ...(tipo && { tipo }),
      nivel: { $lte: nivelUsuario },
    };

    const contenidos = await Contenido.find(filtro);

    res.json(contenidos);
  } catch (error) {
    console.error("ERROR CONTENIDO:", error);
    res.status(500).json({ message: "Error al obtener contenido" });
  }
};