import mongoose from "mongoose";

const contenidoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    enum: ["animal", "numero", "color"],
    required: true,
  },
  imagen: {
    type: String,
  },
  valor: {
    type: Number, // solo para números
  },
  nivel: {
    type: Number,
    default: 1,
  },
}, { timestamps: true });

export default mongoose.model("Contenido", contenidoSchema);
