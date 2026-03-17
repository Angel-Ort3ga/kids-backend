import mongoose from "mongoose";

const contenidoSchema = new mongoose.Schema(
  {
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
      type: String, // ruta o URL de la imagen
      default: "",  // 👈 evita undefined
    },
    sonido: {
      type: String, // ruta o URL del sonido
      default: "",  // 👈 evita undefined
    },
    valor: {
      type: Number, // solo para números
    },
    nivel: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contenido", contenidoSchema);
