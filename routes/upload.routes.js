const router = require("express").Router();
const uploader = require("../middlewares/cloudinary.config.js");

// POST "/api/upload" para acceder a cloudinary y actualizar la imagen de perfil

router.post("/", uploader.single("image"), (req, res, next) => {
  if (!req.file) {
    res.status(400).json({ errorMessage: "There has been an error with your image" });
    return;
  }
  res.json({ imageUrl: req.file.path });
});

module.exports = router;
