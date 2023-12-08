const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const isTokenValid = require("../middlewares/auth.middlewares");

// POST "/api/auth/register" para crear nuevo usuario
router.post("/register", async (req, res, next) => {
  
  const { username, email, password } = req.body;

  // validación campos vacíos:

  if (!username || !email || !password) {
    res
      .status(400)
      .json({ errorMessage: "All fields must be filled" });
    return;
  }

  // validación contraseña segura

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (passwordRegex.test(password) === false) {
    res.status(400).json({
      errorMessage:
        "The password is not secure enough. It must have at least 8 characters, capital letters and a number",
    });
    return;
  }

  // validación email con formato correcto

  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gm;

  if (emailRegex.test(email) === false) {
    res.status(400).json({
      errorMessage: "Email format is not correct",
    });
    return;
  }

  // validación nombre de usuario

  if (username.length < 6) {
    res.status(400).json({
      errorMessage: "Username must have at least 6 characters",
    });
  }

  try {
    // validación de username y email repetidos

    const foundUser = await User.findOne({ username });
    const foundEmail = await User.findOne({ email });

    if (foundUser) {
      res.status(400).json({
        errorMessage: "That username is already in use",
      });
    }

    if (foundEmail) {
      res
        .status(400)
        .json({ errorMessage: "That email is already in use" });
    }

    // Cifrar contraseña

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const createdUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    const payload = {
      _id: createdUser._id,
      username: createdUser.username,
      email: createdUser.email,
      role: createdUser.role,
    };

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "12h",
    });

    res.status(201).json({ authToken });
  } catch (error) {
    next(error);
  }
});

// POST "/api/auth/login" para crear un nuevo token de usuario

router.post("/login", async (req, res, next) => {
  
  const { username, password } = req.body;

  // verificación de campos llenos
  if (!username || !password) {
    res
      .status(400)
      .json({ errorMessage: "All fields must be filled" });
    return;
  }

  try {
    // validación usuario existente
    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      res.status(400).json({ errorMessage: "User not registered" });
      return;
    }
    
    // validación contraseña correcta
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordValid) {
      res.status(400).json({ errorMessage: "Wrong password" });
      return;
    }

    const payload = {
      _id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
      role: foundUser.role,
    };

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "12h",
    });

    res.json({ authToken });
  } catch (error) {
    next(error);
  }
});

// GET "/api/auth/verify" para decirle al FE si el usuario está activo, y cuál es

router.get("/verify", isTokenValid, (req, res, next) => {
  
  res.json({ payload: req.payload });
});

module.exports = router;
