import Contenido from "../models/Contenido.js";
import Progreso from "../models/Progreso.js";
import User from "../models/User.js";
import Logro from "../models/Logro.js";

// reglas dinámicas para cada categoría
const reglas = {
  animal: { totalNiveles: 3, respuestasPorNivel: 4 },
  numero: { totalNiveles: 3, respuestasPorNivel: 3 }, // 👈 ajusta aquí según tu seed
  color:  { totalNiveles: 3, respuestasPorNivel: 4 },
};

const crearProgresoSiNoExiste = async (usuarioId) => {
  let progreso = await Progreso.findOne({ usuario: usuarioId });
  if (!progreso) {
    progreso = await Progreso.create({
      usuario: usuarioId,
      progresoPorCategoria: {
        animal: { nivelActual: 1, correctos: 0, vidas: 3 },
        numero: { nivelActual: 1, correctos: 0, vidas: 3 },
        color:  { nivelActual: 1, correctos: 0, vidas: 3 },
      },
      logrosDesbloqueados: []
    });
  }
  return progreso;
};

// ✅ Obtener contenidos con respuestasPorNivel
export const obtenerContenido = async (req, res) => {
  try {
    const { tipo } = req.query;
    let nivelUsuario = 1;
    const progreso = await Progreso.findOne({ usuario: req.user.id });

    if (progreso && tipo) {
      nivelUsuario = progreso.progresoPorCategoria[tipo]?.nivelActual || 1;
    }

    const contenidos = await Contenido.find({ tipo, nivel: nivelUsuario });

    if (!contenidos || contenidos.length === 0) {
      return res.json({
        tipo,
        nivel: nivelUsuario,
        respuestasPorNivel: reglas[tipo]?.respuestasPorNivel || 0,
        contenidos: [],
        categoriaTerminada: true,
      });
    }

    res.json({
      tipo,
      nivel: nivelUsuario,
      respuestasPorNivel: reglas[tipo]?.respuestasPorNivel || contenidos.length,
      contenidos,
    });
  } catch (error) {
    console.error("ERROR CONTENIDO:", error);
    res.status(500).json({ message: "Error al obtener contenido" });
  }
};


// ✅ Ver progreso
export const verProgreso = async (req, res) => {
  try {
    const progreso = await crearProgresoSiNoExiste(req.user.id);
    res.json(progreso);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener progreso" });
  }
};

// ✅ Subir nivel con reglas unificadas
export const subirNivel = async (req, res) => {
  try {
    const { tipo, correcto } = req.body;
    const progreso = await crearProgresoSiNoExiste(req.user.id);
    const categoria = progreso.progresoPorCategoria[tipo];

    if (correcto) {
      categoria.correctos += 1;
    } else {
      categoria.vidas -= 1;
      if (categoria.vidas <= 0) {
        categoria.correctos = 0;
        categoria.vidas = 3;
        await progreso.save();

        const contenidos = await Contenido.find({ tipo, nivel: categoria.nivelActual });
        return res.json({
          message: "Game Over",
          nivelActual: categoria.nivelActual,
          correctos: categoria.correctos,
          vidas: categoria.vidas,
          respuestasPorNivel: reglas[tipo]?.respuestasPorNivel || contenidos.length,
          contenidos,
        });
      }
    }

    const necesarios = reglas[tipo]?.respuestasPorNivel || 4;
    let logroDesbloqueado = null;

    if (categoria.correctos >= necesarios) {
      const nivelCompletado = categoria.nivelActual;

      const logro = await Logro.findOne({ condicion: `nivel_${nivelCompletado}_${tipo}` });
      if (logro && !progreso.logrosDesbloqueados.includes(logro._id)) {
        progreso.logrosDesbloqueados.push(logro._id);
        logroDesbloqueado = logro;
      }

      categoria.nivelActual += 1;
      categoria.correctos = 0;
      categoria.vidas = 3;
    }

    await progreso.save();
    const contenidos = await Contenido.find({ tipo, nivel: categoria.nivelActual });

    res.json({
      nivelActual: categoria.nivelActual,
      correctos: categoria.correctos,
      vidas: categoria.vidas,
      respuestasPorNivel: reglas[tipo]?.respuestasPorNivel || contenidos.length,
      logros: progreso.logrosDesbloqueados.length,
      logroDesbloqueado,
      contenidos,
      nivelCompletado: true,
    });
  } catch (error) {
    console.error("Error en subirNivel:", error);
    res.status(500).json({ message: "Error al actualizar progreso" });
  }
};

// ✅ Dashboard y perfil ya usan reglas correctas
export const dashboard = async (req, res) => {
  try {
    if (req.user.rol !== "PADRE") {
      return res.status(403).json({ message: "Solo padres pueden ver este panel" });
    }

    const hijos = await User.find({ padre: req.user.id, rol: "NINO" });
    const resultado = [];

    for (const hijo of hijos) {
  const progreso = await crearProgresoSiNoExiste(hijo._id);

  const progresoConMeta = {};
  for (const tipo of Object.keys(progreso.progresoPorCategoria)) {
    const cat = progreso.progresoPorCategoria[tipo];
    progresoConMeta[tipo] = {
      nivelActual: cat.nivelActual,
      correctos: cat.correctos,
      vidas: cat.vidas,
      totalNiveles: reglas[tipo].totalNiveles,
      respuestasPorNivel: reglas[tipo].respuestasPorNivel,
    };
  }

  resultado.push({
    nombre: hijo.nombre,
    apellido: hijo.apellido,
    genero: hijo.genero,
    progreso: progresoConMeta,
  });
}


    res.json(resultado);
  } catch (error) {
    console.error("Error en dashboard:", error);
    res.status(500).json({ message: "Error en dashboard" });
  }
};

export const perfil = async (req, res) => {
  try {
    const usuario = await User.findById(req.user.id);

    if (usuario.rol === "PADRE") {
      const hijos = await User.find({ padre: usuario._id });
      const resultado = [];

      for (const hijo of hijos) {
        const progreso = await crearProgresoSiNoExiste(hijo._id);

        const progresoConMeta = {};
        for (const tipo of Object.keys(progreso.progresoPorCategoria)) {
          progresoConMeta[tipo] = {
            ...progreso.progresoPorCategoria[tipo]._doc,
            ...reglas[tipo],
          };
        }

        resultado.push({
          nombre: hijo.nombre,
          apellido: hijo.apellido,
          genero: hijo.genero,
          progreso: progresoConMeta,
        });
      }

      return res.json({
        tipo: "PADRE",
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        hijos: resultado,
      });
    }

    if (usuario.rol === "NINO") {
      const progreso = await crearProgresoSiNoExiste(usuario._id);

      const progresoConMeta = {};
      for (const tipo of Object.keys(progreso.progresoPorCategoria)) {
        progresoConMeta[tipo] = {
          ...progreso.progresoPorCategoria[tipo]._doc,
          ...reglas[tipo],
        };
      }

      const logrosIds = Array.isArray(progreso.logrosDesbloqueados) ? progreso.logrosDesbloqueados : [];
      const logros = await Logro.find({ _id: { $in: logrosIds } });

      return res.json({
        tipo: "NINO",
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        genero: usuario.genero,
        email: usuario.email,
        progreso: progresoConMeta,
        logros,
      });
    }
  } catch (error) {
    console.error("Error en perfil:", error);
    res.status(500).json({ message: "Error en perfil" });
  }
};