import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Logro from "../models/Logro.js";

dotenv.config();

const logros = [
  // ANIMALES
  { titulo: "Nivel 1 Animales", descripcion: "Has aprendido los animales básicos", icono: "🐶", condicion: "nivel_1_animal" },
  { titulo: "Nivel 2 Animales", descripcion: "Has aprendido animales más avanzados", icono: "🦁", condicion: "nivel_2_animal" },
  { titulo: "Nivel 3 Animales", descripcion: "Has dominado todos los animales", icono: "🐧", condicion: "nivel_3_animal" },

  // NÚMEROS
  { titulo: "Nivel 1 Números", descripcion: "Has aprendido los números básicos", icono: "1️⃣", condicion: "nivel_1_numero" },
  { titulo: "Nivel 2 Números", descripcion: "Has aprendido más números", icono: "5️⃣", condicion: "nivel_2_numero" },
  { titulo: "Nivel 3 Números", descripcion: "Has dominado los números", icono: "9️⃣", condicion: "nivel_3_numero" },

  // COLORES
  { titulo: "Nivel 1 Colores", descripcion: "Has aprendido los colores básicos", icono: "🟥", condicion: "nivel_1_color" },
  { titulo: "Nivel 2 Colores", descripcion: "Has aprendido más colores", icono: "🟩", condicion: "nivel_2_color" },
  { titulo: "Nivel 3 Colores", descripcion: "Has dominado los colores", icono: "⬛", condicion: "nivel_3_color" },
];

const seedLogros = async () => {
  await connectDB();
  await Logro.deleteMany();
  await Logro.insertMany(logros);
  console.log("Logros cargados correctamente ✅");
  process.exit();
};

seedLogros();
