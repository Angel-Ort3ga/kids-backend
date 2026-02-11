import mongoose from "mongoose";

const logroSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  icono: {
    type: String, // emoji o url
    required: true
  },
  condicion: {
    type: String, // ej: "nivel_2", "animales_5"
    required: true
  }
});

export default mongoose.model("Logro", logroSchema);
