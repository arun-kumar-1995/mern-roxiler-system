import Product from "../models/product.models.js";
import { getRequest } from "../services/axios/api.axios.js";
import ErrorHandler from "../utils/errorHandler.utils.js";
import SendResponse from "../utils/sendResponse.utils.js";
import axios from "axios";
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
    const query = req.query;
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

export const getPieChartStats = async (req, res, next) => {
  try {
    const query = req.query;

    const uniqueCategories = await Product.distinct("category").lean();
    const pieChartData = [];

    for (const category of uniqueCategories) {
      const count = await Product.countDocuments({
        ...query,
        category,
      });

      pieChartData.push({ category, count });
    }
    return SendResponse(res, 200, "Here is pie chart details", {
      pieChartData,
    });
  } catch (err) {
    next(err);
  }
};

export const getBarChatStats = async (req, res, next) => {
  try {
    const query = req.query;
    const barChartData = [];
    const chartPriceRange = [
      { range: "0 - 100", min: 0, max: 100 },
      { range: "101 - 200", min: 101, max: 200 },
      { range: "201 - 300", min: 201, max: 300 },
      { range: "301 - 400", min: 301, max: 400 },
      { range: "401 - 500", min: 401, max: 500 },
      { range: "501 - 600", min: 501, max: 600 },
      { range: "601 - 700", min: 601, max: 700 },
      { range: "701 - 800", min: 701, max: 800 },
      { range: "801 - 900", min: 801, max: 900 },
      { range: "901 - above", min: 901, max: "Infinity" },
    ];
    for (const range of chartPriceRange) {
      const count = await Product.countDocuments({
        ...query,
        price: {
          $gte: range.min,
          $lt: range.max === Infinity ? Infinity : range.max,
        },
      });

      barChartData.push({
        range: range.range,
        count,
      });
    }
    return SendResponse(res, 200, "Here is bar chart data", { barChartData });
  } catch (err) {
    next(err);
  }
};

export const getCombinedStats = async (req, res, next) => {
  try {
    let month = Number(req.month);
    const pieChart = await getRequest(`/app/v1/pie-chart-stats?month=${month}`);
    const barGraph = await getRequest(`/app/v1/bar-chart-stats?month=${month}`);
    const stats = await getRequest(`/app/v1/getstats?month=${month}`);

    return SendResponse(res, 200, "Here is combined result", {
      pieChart: pieChart.data,
      barGraph: barGraph.data,
      stats: stats.data,
    });
  } catch (err) {
    next(err);
  }
};
