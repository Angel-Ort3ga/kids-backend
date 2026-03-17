import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    genero: { type: String, enum: ["MASCULINO", "FEMENINO", "OTRO"], required: true },
    fechaNacimiento: { type: Date, required: true },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    rol: { type: String, enum: ["PADRE", "NINO"], default: "NINO" },
    padre: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
