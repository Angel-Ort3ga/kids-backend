import User from "../models/User.js";
import Progreso from "../models/Progreso.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔹 Registro general (padres y niños mayores de 12)
export const register = async (req, res) => {
  try {
    const { nombre, apellido, genero, fechaNacimiento, email, password } = req.body;

    if (!nombre || !apellido || !genero || !fechaNacimiento || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ message: "El usuario ya existe" });

    const edad = new Date().getFullYear() - new Date(fechaNacimiento).getFullYear();
    if (edad < 12) {
      return res.status(400).json({ message: "Los menores de 12 deben ser creados por un padre" });
    }

    let rol = edad >= 18 ? "PADRE" : "NINO";

    const hash = await bcrypt.hash(password, 10);
    const usuario = new User({ nombre, apellido, genero, fechaNacimiento, email, password: hash, rol });
    await usuario.save();

    if (rol === "NINO") await Progreso.create({ usuario: usuario._id });

    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({
      message: "Usuario registrado correctamente",
      token,
      usuario: { id: usuario._id, nombre: usuario.nombre, apellido: usuario.apellido, rol: usuario.rol },
    });
  } catch (error) {
    console.error("Error en registro:", error);

    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

// 🔹 Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await User.findOne({ email });
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({
      message: "Login exitoso",
      token,
      usuario: { id: usuario._id, nombre: usuario.nombre, apellido: usuario.apellido, rol: usuario.rol },
    });
  } catch (error) {
    res.status(500).json({ message: "Error en login" });
  }
};

// 🔹 Crear niño (solo padres)
export const crearNino = async (req, res) => {
  try {
    if (req.user.rol !== "PADRE") {
      return res.status(403).json({ message: "Solo padres pueden crear niños" });
    }

    const { nombre, apellido, genero, fechaNacimiento, email, password } = req.body;

    const edad = new Date().getFullYear() - new Date(fechaNacimiento).getFullYear();
    if (edad >= 12) {
      return res.status(400).json({ message: "Niños mayores de 12 deben registrarse solos" });
    }

    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ message: "El usuario ya existe" });

    const hash = await bcrypt.hash(password, 10);
    const nuevoNino = new User({
      nombre,
      apellido,
      genero,
      fechaNacimiento,
      email,
      password: hash,
      rol: "NINO",
      padre: req.user.id,
    });

    await nuevoNino.save();
    await Progreso.create({ usuario: nuevoNino._id });

    return res.status(201).json({
      message: "Niño creado correctamente",
      nino: { id: nuevoNino._id, nombre: nuevoNino.nombre, apellido: nuevoNino.apellido },
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear niño" });
  }
};

// 🔹 Cambiar contraseña
export const changePassword = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: "La nueva contraseña es obligatoria" });

    const hash = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(req.user.id, { password: hash });

    res.json({ message: "Contraseña cambiada correctamente ✅" });
  } catch (error) {
    res.status(500).json({ message: "Error interno al cambiar contraseña" });
  }
};
