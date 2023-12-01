const User = require("../models/User.model");
const router = require("express").Router();
const uploader = require("../middlewares/cloudinary.config.js");
const isTokenValid = require("../middlewares/auth.middlewares");

// GET "/api/profile/:userId" para conseguir data sobre el usuario

router.get("/:userId", async (req, res, next) => {
  try {
    const response = await User.findById(req.params.userId);
    console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// PUT "/api/profile" para editar data del usuario en la edición del perfil
router.put("/", isTokenValid,  async (req, res, next) => {
  const { firstName, lastName, location, bio, pronouns } = req.body;
  console.log(req.payload)
  try {
    await User.findByIdAndUpdate( req.payload._id, {
      firstName,
      lastName,
      location,
      bio,
      pronouns,
      
    });
    res.json("Profile updated");
  } catch (error) {
    next(error);
  }
});

// PATCH "/api/profile/image" para actualizar imagen del perfil
router.patch("/image", isTokenValid, uploader.single("image"), async (req,res,next) => {
  if (!req.file) {
    res.status(400).json({ errorMessage: "Ha habido un error con la imagen" });
    return;
  }

    try {
      await User.findByIdAndUpdate(req.payload._id, {
        profilePic: req.file.path
      })
      res.json({imageUrl: req.file.path})
    } catch (error) {
      next(error)
    }
})

module.exports = router;
