import Animal from "../models/Animal.js";

// 🟢 Crear animal (PADRE)
export const crearAnimal = async (req, res) => {
  try {
    const animal = await Animal.create(req.body);
    res.status(201).json(animal);
  } catch (error) {
    res.status(400).json({ message: "Error al crear animal", error });
  }
};

// 🟢 Obtener todos (NIÑO / PADRE)
export const obtenerAnimales = async (req, res) => {
  try {
    const animales = await Animal.find();
    res.json(animales);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener animales" });
  }
};
