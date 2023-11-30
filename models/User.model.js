const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    username: {
      type:String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    profilePic: {
      type: String,
      default:"https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
    },
    firstName: String,
    lastName: String,
    bio: String,
    location: String,
    pronouns: {
      type: String,
      enum: ["he/him", "she/her", "they/them"]
    }
  },
  { 
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
