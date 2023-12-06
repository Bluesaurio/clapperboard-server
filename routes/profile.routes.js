const User = require("../models/User.model");
const router = require("express").Router();
const uploader = require("../middlewares/cloudinary.config.js");
const isTokenValid = require("../middlewares/auth.middlewares");
const Review = require("../models/Review.model.js");
const List = require("../models/List.model.js");

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
router.put("/", isTokenValid, async (req, res, next) => {
  const { firstName, lastName, location, bio, pronouns } = req.body;
  console.log(req.payload);
  try {
    await User.findByIdAndUpdate(req.payload._id, {
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
router.patch(
  "/image",
  isTokenValid,
  uploader.single("image"),
  async (req, res, next) => {
    if (!req.file) {
      res
        .status(400)
        .json({ errorMessage: "Ha habido un error con la imagen" });
      return;
    }

    try {
      await User.findByIdAndUpdate(req.payload._id, {
        profilePic: req.file.path,
      });
      res.json({ imageUrl: req.file.path });
    } catch (error) {
      next(error);
    }
  }
);

// GET "/api/profile/:userId/reviews" para conseguir todas las reviews de un user
router.get("/:userId/reviews", async (req, res, next) => {
  try {
    const response = await Review.find({ creatorId: req.params.userId });
    console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// "POST" "api/profile/:userId/list" => Create a new movies list
router.post("/:userId/lists", async (req, res, next) => {
  const { name, description, category } = req.body;

  try {
    const response = await List.create({
      name,
      description,
      category,
      creatorId: req.params.userId,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// "GET" "api/list/:listId" => Get details of a specific list
router.get("/:userId/lists", async (req, res, next) => {
  try {
    const response = await List.find({ creatorId: req.params.userId });
    console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// "PUT" "api/list/:listId" => Edit a specific list

// "DELETE" "api/list/:listId" => Delete a specific list

module.exports = router;
