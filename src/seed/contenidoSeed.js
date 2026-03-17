import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Contenido from "../models/Contenido.js";

dotenv.config();

const contenidos = [
  // ANIMALES NIVEL 1
  { nombre: "Perro", tipo: "animal", imagen: "perro.png", nivel: 1 },
  { nombre: "Gato", tipo: "animal", imagen: "gato.png", nivel: 1 },
  { nombre: "Vaca", tipo: "animal", imagen: "vaca.png", nivel: 1 },
  { nombre: "Caballo", tipo: "animal", imagen: "caballo.png", nivel: 1 },

  // ANIMALES NIVEL 2
  { nombre: "Elefante", tipo: "animal", imagen: "elefante.png", nivel: 2 },
  { nombre: "León", tipo: "animal", imagen: "leon.png", nivel: 2 },
  { nombre: "Tigre", tipo: "animal", imagen: "tigre.png", nivel: 2 },
  { nombre: "Mono", tipo: "animal", imagen: "mono.png", nivel: 2 },

  // ANIMALES NIVEL 3
  { nombre: "Pingüino", tipo: "animal", imagen: "pinguino.png", nivel: 3 },
  { nombre: "Canguro", tipo: "animal", imagen: "canguro.png", nivel: 3 },
  { nombre: "Oso", tipo: "animal", imagen: "oso.png", nivel: 3 },
  { nombre: "Zorro", tipo: "animal", imagen: "zorro.png", nivel: 3 },

  // NÚMEROS NIVEL 1
  { nombre: "Uno", tipo: "numero", valor: 1,imagen: "uno.png", nivel: 1 },
  { nombre: "Dos", tipo: "numero", valor: 2,imagen: "dos.png", nivel: 1 },
  { nombre: "Tres", tipo: "numero", valor: 3,imagen: "tres.png", nivel: 1 },
{ nombre: "Cuatro", tipo: "numero", valor: 4,imagen: "cuatro.png", nivel: 2 },
  // NÚMEROS NIVEL 2
  
  { nombre: "Cinco", tipo: "numero", valor: 5,imagen: "cinco.png", nivel: 2 },
  { nombre: "Seis", tipo: "numero", valor: 6,imagen: "seis.png", nivel: 2 },
{ nombre: "Siete", tipo: "numero", valor: 7,imagen: "siete.png", nivel: 3 },
  { nombre: "Ocho", tipo: "numero", valor: 8,imagen: "ocho.png", nivel: 3 },
  // NÚMEROS NIVEL 3
  
  { nombre: "Nueve", tipo: "numero", valor: 9,imagen: "nueve.png", nivel: 3 },
{ nombre: "Diez", tipo: "numero", valor: 10,imagen: "diez.png", nivel: 3 },
  { nombre: "Once", tipo: "numero", valor: 11,imagen: "once.png", nivel: 3 },
  { nombre: "Donce", tipo: "numero", valor: 12,imagen: "doce.png", nivel: 3 },
  
  // COLORES NIVEL 1
  { nombre: "Rojo", tipo: "color",imagen: "rojo.png", nivel: 1 },
  { nombre: "Azul", tipo: "color",imagen: "azul.png", nivel: 1 },
  { nombre: "Amarillo", tipo: "color",imagen: "amarillo.png", nivel: 1 },
   { nombre: "Blanco", tipo: "color",imagen: "blanco.png", nivel: 1 },

  // COLORES NIVEL 2
  { nombre: "Verde", tipo: "color",imagen: "verde.png", nivel: 2 },
  { nombre: "Naranja", tipo: "color",imagen: "naranja.png", nivel: 2 },
  { nombre: "Morado", tipo: "color",imagen: "morado.png", nivel: 2 },
 { nombre: "Negro", tipo: "color",imagen: "negro.png", nivel: 2 },
  // COLORES NIVEL 3
  { nombre: "Rosa", tipo: "color",imagen: "rosa.png", nivel: 3 },
  { nombre: "Café", tipo: "color",imagen: "cafe.png", nivel: 3 },
  { nombre: "Dorado", tipo: "color",imagen: "dorado.png", nivel: 3 },
  { nombre: "Gris", tipo: "color",imagen: "gris.png", nivel: 3 },
];

const seedData = async () => {
  await connectDB();
  await Contenido.deleteMany();
  await Contenido.insertMany(contenidos);
  console.log("Contenido cargado correctamente ✅");
  process.exit();
};

seedData();
