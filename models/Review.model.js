const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
    text: String,
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    creator: String,
    filmId: Number,
    picture: String,
    movieTitle: String,
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
