const { Schema, model, mongoose } = require("mongoose");

const listSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    category: {
      type: String,
      enum: ["favorite", "watchlist", "custom"],
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

const List = model("List", listSchema);

module.exports = List;
