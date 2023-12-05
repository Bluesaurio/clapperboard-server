const { Schema, model, mongoose } = require("mongoose");

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
      enum: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
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

const Review = model("Review", reviewSchema);

module.exports = Review;
