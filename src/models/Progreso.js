import mongoose from "mongoose";

const progresoSchema = new mongoose.Schema(
  {
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    progresoPorCategoria: {
      animal: {
        nivelActual: { type: Number, default: 1 },
        correctos: { type: Number, default: 0 },
        vidas: { type: Number, default: 3 },
      },
      numero: {
        nivelActual: { type: Number, default: 1 },
        correctos: { type: Number, default: 0 },
        vidas: { type: Number, default: 3 },
      },
      color: {
        nivelActual: { type: Number, default: 1 },
        correctos: { type: Number, default: 0 },
        vidas: { type: Number, default: 3 },
      },
    },

    logrosDesbloqueados: [{ type: mongoose.Schema.Types.ObjectId, ref: "Logro" }],
  },
  { timestamps: true }
);

export default mongoose.model("Progreso", progresoSchema);
