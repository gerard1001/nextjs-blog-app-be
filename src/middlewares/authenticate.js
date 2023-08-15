const { decodeToken } = require("../helpers/jwt.helper");
const { fetchTokenInHeaders } = require("../utils/fetchToken.utils");

const jwtSercret = "#ardworkIsthek3y";
const expiresIn = "1d";

const checkLoggedIn = async (req, res, next) => {
  try {
    const token = await fetchTokenInHeaders(req);
    if (!token) {
      return res.status(401).json({
        message: "you are not logged in",
      });
    }

    const user = decodeToken(token);
    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "unauthorized",
    });
  }
};

module.exports = { checkLoggedIn };
