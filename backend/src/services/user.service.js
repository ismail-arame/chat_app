const createHttpError = require("http-errors");
const { UserModel } = require("../models");

exports.findUser = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw createHttpError.BadRequest("this account no longer exist.");
  }
  return user;
};
