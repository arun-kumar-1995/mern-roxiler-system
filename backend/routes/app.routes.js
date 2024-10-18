import express from "express";
import checkMonth from "../middlewares/checkMonth.middleware.js";

import {
  getProductTransaction,
  getStats,
  getPieChartStats,
  getBarChatStats,
  getCombinedStats
} from "../controllers/product.controllers.js";

const router = express.Router();

router.route("/get-transaction").get(getProductTransaction);
router.route("/getstats").get(checkMonth, getStats);
router.route("/pie-chart-stats").get(checkMonth, getPieChartStats);
router.route("/bar-chart-stats").get(checkMonth, getBarChatStats);
router.route("/combined-stats").get(checkMonth , getCombinedStats);

export default router;
