import mongoose from "mongoose";

const progresoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  nivelActual: {
    type: Number,
    default: 1,
  },
  logrosDesbloqueados: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Logro",
    },
  ],
}, { timestamps: true });

export default mongoose.model("Progreso", progresoSchema);