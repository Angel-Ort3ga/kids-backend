import mongoose from "mongoose";

const animalSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    imagen: {
      type: String,
      required: true,
    },
    sonido: {
      type: String,
      required: true,
    },
    categoria: {
      type: String,
      enum: ["GRANJA", "SELVA", "MAR"],
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Animal", animalSchema);
