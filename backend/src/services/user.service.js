const createHttpError = require("http-errors");
const { UserModel } = require("../models");

exports.findUser = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw createHttpError.BadRequest("this account no longer exist.");
  }
  return user;
};

exports.searchUsersService = async (keyword) => {
  // perform a search in the UserModel using a regular expression (regex) to find users whose name matches the provided keyword case-insensitively.
  const users = await UserModel.find({
    name: { $regex: keyword, $options: "i" },
  });
  return users;
};
