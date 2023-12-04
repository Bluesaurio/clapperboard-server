const Review = require("../models/Review.model");
const isTokenValid = require("../middlewares/auth.middlewares");

const router = require("express").Router();

// POST "/api/review/:movieId" para crear una review
router.post("/:movieId", isTokenValid, async (req, res, next) => {
  console.log("RATING AQUI", req.body);
  // console.log("AQUI ESTA EL REQ.PAYLOAD", req.payload)

  // Primero buscar reseñas de esa pelicula y de ese User, y si se encuentra una, se envía un error de "no puedes volver a crear una reseña"
  try {
    const response = await Review.create({
      rating: req.body.rating,
      text: req.body.text,
      filmId: req.params.movieId,
      creatorId: req.payload._id,
      creator: req.payload.username,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// GET "/api/review/:movieId" para conseguir todas las reviews de una película
router.get("/:movieId", async (req, res, next) => {
  try {
    const response = await Review.find({ filmId: req.params.movieId });
    console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// PUT "/api/review/:reviewId" para editar una review específica

// DELETE "/api/review/:reviewId" para eliminar una review

module.exports = router;
