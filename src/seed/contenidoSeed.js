import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Contenido from "../models/Contenido.js";

dotenv.config();

const contenidos = [
  // ANIMALES
  { nombre: "Perro", tipo: "animal", imagen: "perro.png", nivel: 1 },
  { nombre: "Gato", tipo: "animal", imagen: "gato.png", nivel: 1 },
  { nombre: "Elefante", tipo: "animal", imagen: "elefante.png", nivel: 2 },

  // NÚMEROS
  { nombre: "Uno", tipo: "numero", valor: 1, nivel: 1 },
  { nombre: "Dos", tipo: "numero", valor: 2, nivel: 1 },
  { nombre: "Tres", tipo: "numero", valor: 3, nivel: 2 },

  // COLORES
  { nombre: "Rojo", tipo: "color", nivel: 1 },
  { nombre: "Azul", tipo: "color", nivel: 1 },
  { nombre: "Verde", tipo: "color", nivel: 2 },
];

const seedData = async () => {
  await connectDB();

  await Contenido.deleteMany();
  await Contenido.insertMany(contenidos);

  console.log("Contenido cargado correctamente");
  process.exit();
};

seedData();
