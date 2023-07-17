const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email."],
      unique: [true, "This email already exists."],
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email."],
    },
    picture: {
      type: String,
      trim: true,
      default:
        "https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png",
    },
    status: {
      type: String,
      default: "Hey there ! I am using whatsapp",
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minLength: [
        6,
        "Plase make sure your password is atleast 6 characters long",
      ],
      maxLength: [
        128,
        "Plase make sure your password is less than 128 characters long",
      ],
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

const UserModel =
  mongoose.models.UserModel || mongoose.model("UserModel", userSchema);

module.exports = UserModel;
