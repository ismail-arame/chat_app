const createHttpError = require("http-errors");
const validator = require("validator");
const { UserModel } = require("../models/index");
const bcrypt = require("bcrypt");

exports.createUser = async (userData) => {
  const { name, email, picture, status, password } = userData;

  //env variables
  const { DEFAULT_PICTURE, DEFAULT_STATUS } = process.env;

  //Check if fields are empty.
  if (!name || !email || !password) {
    throw createHttpError.BadRequest("Please fill all fields.");
  }

  //Check name length
  if (
    !validator.isLength(name, {
      min: 2,
      max: 16,
    })
  ) {
    throw createHttpError.BadRequest(
      "Please make sure your name is between 2 and 16 characters long."
    );
  }

  //Check status length
  if (status && status.length > 60) {
    throw createHttpError.BadRequest(
      "Please make sure your status is less than 60 characters long."
    );
  }

  //Check if email is valid
  if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest(
      "Please make sure to enter a valid email."
    );
  }

  //Check if user already exist
  const checkDB = await UserModel.findOne({ email });
  //   console.log("checkDB", checkDB);
  if (checkDB) {
    throw createHttpError.Conflict(
      "This email already exists please enter another email."
    );
  }

  //Check password length
  if (
    !validator.isLength(password, {
      min: 6,
      max: 32,
    })
  ) {
    throw createHttpError.BadRequest(
      "Please make sure your password is between 6 and 32 characters long."
    );
  }

  //encrypting the Password
  const cryptedPassword = await bcrypt.hash(password, 12);

  //saving data to the database
  const user = await new UserModel({
    name,
    email,
    picture: picture || DEFAULT_PICTURE,
    status: status || DEFAULT_STATUS,
    password: cryptedPassword,
  }).save();

  return user;
};

exports.signUser = async (email, password) => {
  //By using lean(), the user object returned will not have any Mongoose-specific functionality or features. It will be a lightweight plain JavaScript object containing the user's data from the database.
  const user = await UserModel.findOne({ email: email.toLowerCase() }).lean();

  //check if email exist
  if (!user) {
    throw createHttpError.BadRequest("password or email is incorrect.");
  }

  //compare passwords
  const isPasswordTheSame = await bcrypt.compare(password, user.password);
  if (!isPasswordTheSame) {
    throw createHttpError.BadRequest("password or email is incorrect.");
  }

  return user;
};
