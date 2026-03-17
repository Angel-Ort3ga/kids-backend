import Contenido from "../models/Contenido.js";
import Progreso from "../models/Progreso.js";

export const obtenerContenido = async (req, res) => {
  try {
    const { tipo } = req.query;

    let nivelUsuario = 1;
    const progreso = await Progreso.findOne({ usuario: req.user.id });

    if (progreso && tipo) {
      nivelUsuario = progreso.progresoPorCategoria[tipo]?.nivelActual || 1;
    }

    const filtro = {
      ...(tipo && { tipo }),
      nivel: nivelUsuario,
    };

    const contenidos = await Contenido.find(filtro);

    if (!contenidos || contenidos.length === 0) {
      // 👇 en vez de devolver nivel 1, marca categoría terminada
      return res.json({ contenidos: [], categoriaTerminada: true });
    }

    res.json(contenidos);
  } catch (error) {
    console.error("ERROR CONTENIDO:", error);
    res.status(500).json({ message: "Error al obtener contenido" });
  }
};
