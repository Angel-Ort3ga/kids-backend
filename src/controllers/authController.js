import User from "../models/User.js";
import Progreso from "../models/Progreso.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { nombre, email, password, edad } = req.body;

    const existe = await User.findOne({ email });
    if (existe) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    let rol;
    let padre = null;

    if (edad >= 12) {
      // Niño autónomo
      rol = "NINO";
    } else {
      // Menor de 12 no puede registrarse solo
      return res.status(400).json({
        message: "Los menores de 12 deben ser creados por un padre",
      });
    }

    const usuario = new User({
      nombre,
      email,
      password: hash,
      edad,
      rol,
      padre,
    });

    await usuario.save();

    await Progreso.create({
      usuario: usuario._id,
      nivelActual: 1,
      logrosDesbloqueados: [],
    });

    res.status(201).json({
      message: "Usuario registrado correctamente",
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

export const registerPadre = async (req, res) => {
  try {
    const { nombre, email, password, edad } = req.body;

    if (edad < 18) {
      return res.status(400).json({
        message: "Un padre debe ser mayor de edad",
      });
    }

    const existe = await User.findOne({ email });
    if (existe) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const usuario = new User({
      nombre,
      email,
      password: hash,
      edad,
      rol: "PADRE",
    });

    await usuario.save();

    res.status(201).json({
      message: "Padre registrado correctamente",
    });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar padre" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      message: "Login exitoso",
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error en login" });
  }
};

export const crearNino = async (req, res) => {
  try {
    console.log("USUARIO LOGUEADO:", req.usuario);

    if (req.usuario.rol !== "PADRE") {
      return res.status(403).json({ message: "Solo padres pueden crear niños" });
    }

    const { nombre, email, password, edad } = req.body;

    if (edad >= 12) {
      return res.status(400).json({
        message: "Niños mayores de 12 deben registrarse solos",
      });
    }

    const existe = await User.findOne({ email });
    if (existe) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // 👇 IMPORTANTE: declaramos correctamente la variable
    const nuevoNino = new User({
      nombre,
      email,
      password: hash,
      edad,
      rol: "NINO",
      padre: req.usuario.id,
    });

    await nuevoNino.save();

    await Progreso.create({
      usuario: nuevoNino._id,
      nivelActual: 1,
      logrosDesbloqueados: [],
    });

    return res.status(201).json({
      message: "Niño creado correctamente",
      nino: {
        id: nuevoNino._id,
        nombre: nuevoNino.nombre,
      },
    });
  } catch (error) {
    console.error("ERROR COMPLETO:", error);
    return res.status(500).json({
      message: "Error al crear niño",
      error: error.message,
    });
  }
};
