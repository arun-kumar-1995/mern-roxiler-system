import Product from "../models/product.models.js";
import ErrorHandler from "../utils/errorHandler.utils.js";
import SendResponse from "../utils/sendResponse.utils.js";

// Default pagination values
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

export const getProductTransaction = async (req, res, next) => {
  try {
    let {
      search = "",
      page = DEFAULT_PAGE,
      perPage = DEFAULT_PER_PAGE,
      p_min,
      p_max,
    } = req.query;

    const query = {};
    if (page) page = parseInt(page);
    if (perPage) perPage = parseInt(perPage);

    if (p_min) p_min = parseFloat(p_min).toFixed(2);
    if (p_max) p_max = parseFloat(p_max).toFixed(2);

    if (search)
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];

    if (p_min && p_max) {
      query.price = { $gte: p_min, $lte: p_max };
    }

    const totalRecords = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalRecords / perPage);
    const skip = (page - 1) * perPage;

    const transaction = await Product.find(query)
      .limit(perPage)
      .skip(skip)
      .sort({ dateOfSale: -1 })
      .lean();

    // return res.status(200).json({
    //   success: true,
    //   message: "Here is transaction lists",
    //   data: {
    //     page,
    //     perPage,
    //     pages: totalPages,
    //     total: totalRecords,
    //     docs: transaction,
    //   },
    // });
    return SendResponse(res, 200, {
      page,
      perPage,
      pages: totalPages,
      total: totalRecords,
      docs: transaction,
    });
  } catch (err) {
    console.error("Error getting product transaction", err);
    next(err);
  }
};

export const getStats = async (req, res, next) => {
  try {
    const { month } = req.query;
    if (!month) return ErrorHandler(res, 400, "Month can't be empty");

    const query = {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, month],
      },
    };

    const priceDocs = await Product.find({ ...query, sold: true })
      .select("price dateOfSale sold")
      .lean();

    const totalSales = priceDocs.reduce(
      (sum, product) => sum + product.price,
      0
    );

    const totalSoldItems = await Product.countDocuments({
      ...query,
      sold: true,
    });

    const totalUnSoldItems = await Product.countDocuments({
      ...query,
      sold: false,
    });

    return SendResponse(res, 200, "Here is statics", {
      totalSales,
      totalSoldItems,
      totalUnSoldItems,
    });
  } catch (err) {
    next(err);
  }
};
