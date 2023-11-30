const jwt = require("jsonwebtoken");

function isTokenValid(req, res, next) {
  // console.log(req.headers);

  try {
    const token = req.headers.authorization.split(" ")[1];

    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    req.payload = payload;
  } catch (error) {
    res.status(401).json("El token no existe o no es válido");
  }

  next();
}

module.exports = isTokenValid;
