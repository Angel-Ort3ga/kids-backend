import mongoose from "mongoose";

const progresoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  animalesDesbloqueados: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Animal"
    }
  ],logrosDesbloqueados: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Logro"
  }
],
  nivelActual: {
    type: Number,
    default: 1
  }
  
});

export default mongoose.model("Progreso", progresoSchema);
