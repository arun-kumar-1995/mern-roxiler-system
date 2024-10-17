import ErrorHandler from "../utils/errorHandler.utils.js";

const checkMonth = (req, res, next) => {
  const { month } = req.query;
  if (!month) return ErrorHandler(res, 400, "Month can't be empty");
  const query = {
    $expr: {
      $eq: [{ $month: "$dateOfSale" }, month],
    },
  };
  req.query = query;
  next();
};

export default checkMonth;
