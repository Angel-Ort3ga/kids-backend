import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./src/app.js";
import seed from "./src/seed/contenidoSeed.js";

dotenv.config();

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB Atlas");

    if (process.env.RUN_SEED === "true") {
      await seed();
      console.log("Seed ejecutado");
    }

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
  } catch (err) {
    console.error("❌ Error al iniciar servidor:", err);
  }
};

startServer();