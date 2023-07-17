const jwt = require("jsonwebtoken");
const logger = require("../configs/logger.config");

exports.sign = async (payload, expiresIn, secret) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secret,
      {
        expiresIn: expiresIn,
      },
      (error, token) => {
        if (error) {
          logger.error(error);
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
};

exports.verify = async (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, decoded_token) => {
      if (error) {
        logger.error(error);
        reject(null);
      } else {
        resolve(decoded_token);
      }
    });
  });
};
