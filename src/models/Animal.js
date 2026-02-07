import mongoose from "mongoose";

const animalSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  imagen: {
    type: String, // URL o path
    required: true
  },
  sonido: {
    type: String, // URL o path
    required: true
  },
  nivel: {
    type: Number,
    required: true
  }
});

export default mongoose.model("Animal", animalSchema);
