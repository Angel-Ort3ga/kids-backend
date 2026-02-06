import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    edad: {
      type: Number,
      required: true,
    },
    rol: {
      type: String,
      enum: ["PADRE", "NINO"],
      default: "NINO",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
