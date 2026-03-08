const jwt = require("jsonwebtoken");

const generateToken = (userExists) => {
  return jwt.sign(
    { id: userExists._id, role: userExists.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

module.exports = generateToken;
