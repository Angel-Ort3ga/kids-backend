import Animal from "../models/Animal.js";
import Progreso from "../models/Progreso.js";

// 🧒 Niño ve animales desbloqueados
export const obtenerAnimales = async (req, res) => {
  console.log("USUARIO:", req.usuario);

  try {
    const progreso = await Progreso.findOne({
      usuario: req.usuario.id
    });

    if (!progreso) {
      return res.status(404).json({ message: "Progreso no encontrado" });
    }

    const animales = await Animal.find({
      nivel: { $lte: progreso.nivelActual }
    });

    res.json(animales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener animales" });
  }
};

// 🛠️ SOLO PARA PRUEBAS (luego se elimina)
export const crearAnimal = async (req, res) => {
  try {
    const animal = new Animal(req.body);
    await animal.save();
    res.status(201).json(animal);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error al crear animal" });
  }
};
