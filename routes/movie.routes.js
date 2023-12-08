const router = require("express").Router();
const axios = require("axios");

// GET "/movie/popular" => Route to get a list of popular movies from API
router.get("/popular", async (req, res, next) => {
  try {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    };

    const response = await axios.request(options);

    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

// GET "/movie/:movieId/details" => Route to get details for a specific movie from API
router.get("/:movieId/details", async (req, res, next) => {
  
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

    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

// GET "/movie/:search/results" => Route to get a specific movie from API
router.get("/:search/results", async (req, res, next) => {

  try {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/search/movie?query=${req.params.search}&include_adult=true&language=en-US&page=1`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    };
    const response = await axios.request(options);

    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
