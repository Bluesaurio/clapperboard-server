const User = require("../models/User.model");
const router = require("express").Router();
const uploader = require("../middlewares/cloudinary.config.js");
const isTokenValid = require("../middlewares/auth.middlewares");
const Review = require("../models/Review.model.js");
const List = require("../models/List.model.js");
const axios = require("axios");

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
router.post("/lists", isTokenValid, async (req, res, next) => {
  const { name, description, category } = req.body;

  try {
    const response = await List.create({
      name,
      description,
      category,
      creatorId: req.payload._id,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// "GET" "api/profile/:userId/lists => Get lists created by user
router.get("/:userId/lists", async (req, res, next) => {
  try {
    const response = await List.find({ creatorId: req.params.userId });
    console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// "GET" "api/profile/:userId/lists/:listId" => Get details of a specific list
router.get("/:userId/lists/:listId", async (req, res, next) => {
  try {
    const response = await List.findOne({
      _id: req.params.listId,
      creatorId: req.params.userId,
    });
    console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// "PUT" "api/profile/:userId/lists/:listId" => Edit a specific list
router.put("/:userId/lists/:listId", async (req, res, next) => {
  const { name, description } = req.body;
  const { listId } = req.params;

  try {
    const response = await List.findByIdAndUpdate(listId, {
      name,
      description,
    });
    console.log(response);
    res.json("List updated");
  } catch (error) {
    next(error);
  }
});

// "DELETE" "api/profile/:userId/lists/:listId" => Delete a specific list
router.delete("/:userId/lists/:listId", async (req, res, next) => {
  try {
    await List.findByIdAndDelete(req.params.listId);
    res.json("List deleted");
  } catch (error) {
    next(error);
  }
});

// "PATCH" "api/profile/lists/:listId/:movieId" => Add or remove films from a specific list
router.patch("/lists/:listId/:movieId", async (req, res, next) => {
  const { listId, movieId } = req.params;
  try {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${req.params.movieId}`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    };

    const response = await axios.request(options);
    const movieDetails = {
      apiId: response.data.id,
      title: response.data.title,
      image: response.data.poster_path,
    };

    await List.findByIdAndUpdate(listId, {
      $addToSet: {
        filmDetails: movieDetails,
      },
    });

    res.json("Movie added to list");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
