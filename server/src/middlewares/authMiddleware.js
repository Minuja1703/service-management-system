const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "Token not found or expired.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: "You are not authorized. Invalid or token missing.",
    });
  }
};

module.exports = protect;
