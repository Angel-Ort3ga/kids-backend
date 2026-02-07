import mongoose from "mongoose";
import dotenv from "dotenv";
import Animal from "../src/models/Animal.js";

dotenv.config();

const animales = [
  { nombre: "Perro", categoria: "Doméstico", color: "Café", nivel: 1 },
  { nombre: "Gato", categoria: "Doméstico", color: "Gris", nivel: 1 },
  { nombre: "Vaca", categoria: "Granja", color: "Blanco", nivel: 2 },
  { nombre: "León", categoria: "Salvaje", color: "Amarillo", nivel: 3 }
];

const seedAnimales = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Animal.deleteMany();
    await Animal.insertMany(animales);
    console.log("Animales cargados correctamente");
    process.exit();
  } catch (error) {
    console.error("Error cargando animales", error);
    process.exit(1);
  }
};

seedAnimales();
