import express from "express";
import checkMonth from "../middlewares/checkMonth.middleware.js";
import {
  getProductTransaction,
  getStats,
  getPieChartStats,
} from "../controllers/product.controllers.js";
const router = express.Router();

router.route("/get-transaction").get(getProductTransaction);
router.route("/getstats").get(checkMonth, getStats);
router.route("/pie-chart-stats").get(checkMonth, getPieChartStats);

export default router;
