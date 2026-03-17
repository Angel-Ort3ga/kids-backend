import mongoose from "mongoose";
import Progreso from "../models/Progreso.js";

const run = async () => {
  await mongoose.connect("mongodb://localhost:27017/tu_base"); // ajusta tu conexión

  const todos = await Progreso.find({});
  for (const prog of todos) {
    prog.progresoPorCategoria = prog.progresoPorCategoria || {};
    prog.progresoPorCategoria.animal = prog.progresoPorCategoria.animal || { nivelActual: 1, correctos: 0, vidas: 3 };
    prog.progresoPorCategoria.numero = prog.progresoPorCategoria.numero || { nivelActual: 1, correctos: 0, vidas: 3 };
    prog.progresoPorCategoria.color  = prog.progresoPorCategoria.color  || { nivelActual: 1, correctos: 0, vidas: 3 };
    await prog.save();
  }

  console.log("Migración completa");
  process.exit();
};

run();
