const createHttpError = require("http-errors");
const logger = require("../configs/logger.config");
const { searchUsersService } = require("../services/user.service");

exports.searchUsers = async (req, res, next) => {
  try {
    const keyword = req.query.search;
    if (!keyword) {
      logger.error("Please add a search query");
      throw createHttpError.BadRequest("Something went wrong");
    }

    const users = await searchUsersService(keyword);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
