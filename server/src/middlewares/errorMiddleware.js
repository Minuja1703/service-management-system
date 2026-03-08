const handleErrors = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Something went wrong. Please try again.";

  res.status(statusCode).json({ message: message });
  next();
};

module.exports = handleErrors;
