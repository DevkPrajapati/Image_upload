import ErrorHandler from "../utils/errorHandler";

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    err = new ErrorHandler(`Resource not found. Invalid: ${err.path}`, 400);
  }

  if (err.code === 11000) {
    err = new ErrorHandler(`Duplicate ${Object.keys(err.keyValue)} entered`, 400);
  }

  if (err.name === "JsonWebTokenError") {
    err = new ErrorHandler("Invalid JSON Web Token, please try again", 401);
  }

  if (err.name === "TokenExpiredError") {
    err = new ErrorHandler("JSON Web Token expired, please try again", 401);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default  errorMiddleware;
