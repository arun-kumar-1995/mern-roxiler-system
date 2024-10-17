const errorMiddleware = (err, req, res, next) => {
  let errCode = err.errCode || 500;
  let errMsg = err.message || "Internal Server Error";

  //reference error
  if (err instanceof ReferenceError) {
    errCode = 400;
  }

  // MongoDB connection errors
  if (err.name === "MongoNetworkError") {
    errCode = 503;
    errMsg = "Unable to connect to the database. Please try again later.";
  }
  // duplicate key error
  if (err.code === 11000) {
    errCode = 400;
    const field = Object.keys(err.keyValue)[0];
    errMsg = `Duplicate value for ${field}. Please use a different value.`;
  }

  // validation error
  if (err.name === "ValidationError") {
    const fieldNames = Object.values(err.errors).map((err) => err.path);
    errMsg = `${fieldNames.join(", ")} is required.`;
  }
  // return the json response
  return res.status(errCode).json({
    success: false,
    message: errMsg,
    status: errCode,
  });
};

export default errorMiddleware;
