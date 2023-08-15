const jwt = require("jsonwebtoken");

const jwtSercret = "#ardworkIsthek3y";
const expiresIn = "1d";

const generateToken = (payload) => {
  try {
    return jwt.sign({ ...payload }, jwtSercret, { expiresIn });
  } catch (error) {
    throw new Error(error);
  }
};

const decodeToken = (token) => {
  try {
    return jwt.verify(token, jwtSercret);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { generateToken, decodeToken };
