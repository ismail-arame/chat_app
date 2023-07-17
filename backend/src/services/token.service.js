const { sign, verify } = require("../utils/token.util");

exports.generateToken = async (payload, expiresIn, secret) => {
  const token = await sign(payload, expiresIn, secret);
  return token;
};

exports.verifyToken = async (token, secret) => {
  const decoded_token = await verify(token, secret);
  return decoded_token;
};
