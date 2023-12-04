const Review = require("../models/Review.model");
const isTokenValid = require("../middlewares/auth.middlewares");

const router = require("express").Router();

// POST "/api/review/:movieId" para crear una review

router.post("/:movieId", isTokenValid, async (req,res,next) => {
   
    console.log("AQUI ESTA EL REQ.PAYLOAD", req.payload)
    try {
        const response = await Review.create({
            rating: req.body.rating,
            text: req.body.text,
            filmId: req.params.movieId,
            creatorId: req.payload._id,
            creator:req.payload.username
            
        })
        res.json(response)
    } catch (error) {
        next(error)
    }
})

// PUT "/api/review/:reviewId" para editar una review específica



// DELETE "/api/review/:reviewId" para eliminar una review

module.exports = router;