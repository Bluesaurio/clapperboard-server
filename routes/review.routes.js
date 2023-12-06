const Review = require("../models/Review.model");
const isTokenValid = require("../middlewares/auth.middlewares");
const axios = require("axios");

const router = require("express").Router();

// POST "/api/review/:movieId" para crear una review
router.post("/:movieId", isTokenValid, async (req, res, next) => {
  console.log("RATING AQUI", req.body);
  // console.log("AQUI ESTA EL REQ.PAYLOAD", req.payload)

  // TODO ? Primero buscar reseñas de esa pelicula y de ese User, y si se encuentra una, se envía un error de "no puedes volver a crear una reseña"
  try {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${req.params.movieId}`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    };

    const movieData = await axios.request(options);

    console.log(movieData);

    const response = await Review.create({
      rating: req.body.rating,
      text: req.body.text,
      filmId: req.params.movieId,
      creatorId: req.payload._id,
      movieTitle: movieData.data.title,
      picture: movieData.data.poster_path,
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
    //console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// GET "api/review/:movieId/:userId" para buscar una review con la ID del usuario y saber si ya ha publicado una
router.get("/:movieId/:userId", async (req,res,next) => {
  try {
    
  } catch (error) {
    next(error)
  }
})



// PUT "/api/review/:reviewId" para editar una review específica
router.put("/:reviewId", async (req, res, next) => {
  const { reviewId } = req.params;
  const { rating, text } = req.body;

  console.log("Donde está esto", req.params, req.body);

  try {
    const response = await Review.findByIdAndUpdate(reviewId, { rating, text });
   
    console.log(response);
    res.json("Review updated");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// DELETE "/api/review/:reviewId" para eliminar una review
router.delete("/:reviewId", async (req, res, next) => {
  try {
    await Review.findByIdAndDelete(req.params.reviewId);
    res.json("Review deleted");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
