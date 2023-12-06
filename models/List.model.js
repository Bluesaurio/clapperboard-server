const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    category: {
      type: String,
      enum: ["Favorites", "Watchlist", "Custom"],
      required: true,
    },
    listPic: String,
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    filmId: Number,
  },
  {
    timestamps: true,
  }
);

const List = mongoose.model("List", listSchema);

module.exports = List;
