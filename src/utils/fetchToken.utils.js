const fetchTokenInHeaders = (req) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { fetchTokenInHeaders };
