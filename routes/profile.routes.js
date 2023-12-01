const User = require("../models/User.model");
const router = require("express").Router();

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
router.put("/", async (req, res, next) => {
  const { firstName, lastName, location, bio, pronouns } = req.body;

  try {
    await User.findOneAndUpdate({
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

module.exports = router;
