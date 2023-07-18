const createHttpError = require("http-errors");
const { createUser, signUser } = require("../services/auth.service");
const { generateToken, verifyToken } = require("../services/token.service");
const { findUser } = require("../services/user.service");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const { name, email, picture, status, password } = req.body;
    console.log(name, email, picture, status, password);
    const newUser = await createUser({
      name,
      email,
      picture,
      status,
      password,
    });

    // Generating Access and Refresh Tokens
    const access_token = await generateToken(
      { userId: newUser._id.toString() },
      "1d",
      process.env.ACCESS_TOKEN_SECRET
    );
    const refresh_token = await generateToken(
      { userId: newUser._id.toString() },
      "30d",
      process.env.REFRESH_TOKEN_SECRET
    );

    //saving the refresh token inside a cookie in certain route
    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/auth/refreshtoken",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    });

    res.json({
      message: "register success.",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        picture: newUser.picture,
        status: newUser.status,
        access_token,
      },
    });
  } catch (error) {
    //error will be passed to createHttpError package
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await signUser(email, password);

    // Generating Access and Refresh Tokens
    const access_token = await generateToken(
      { userId: user._id.toString() },
      "1d",
      process.env.ACCESS_TOKEN_SECRET
    );
    const refresh_token = await generateToken(
      { userId: user._id.toString() },
      "30d",
      process.env.REFRESH_TOKEN_SECRET
    );

    //saving the refresh token inside a cookie in certain route
    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/auth/refreshtoken",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    });

    res.json({
      message: "login success.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        status: user.status,
        access_token,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    //removing the refresh token from the cookie
    res.clearCookie("refreshtoken", { path: "/auth/refreshtoken" });

    res.json({
      message: "logged out successfully.",
    });
  } catch (error) {
    next(error);
  }
};
exports.refreshToken = async (req, res, next) => {
  try {
    //get the refresh token from the cookie
    const refresh_token = req.cookies.refreshtoken;
    if (!refresh_token) {
      throw createHttpError.Unauthorized(
        "You are not authorized please login."
      );
    }
    //verify refresh token
    const decoded_token = await verifyToken(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET
    );

    if (!decoded_token) {
      throw createHttpError.Unauthorized(
        "You are not authorized please login."
      );
    }

    //get the user data from the database using the decoded_token id
    const user = await findUser(decoded_token.userId);

    // Generating new Access Token
    const access_token = await generateToken(
      { userId: user._id.toString() },
      "1d",
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        status: user.status,
        access_token,
      },
    });
  } catch (error) {
    next(error);
  }
};
