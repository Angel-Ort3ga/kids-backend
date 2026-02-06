import mongoose from "mongoose";

const progresoSchema = new mongoose.Schema(
  {
    nino: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    modulo: {
      type: String,
      enum: ["ANIMALES", "NUMEROS", "COLORES"],
      required: true,
    },
    nivel: {
      type: Number,
      default: 1,
    },
    aciertos: {
      type: Number,
      default: 0,
    },
    errores: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Progreso", progresoSchema);
