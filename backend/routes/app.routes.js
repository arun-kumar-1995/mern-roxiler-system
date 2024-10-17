import express from "express";
import {
  getProductTransaction,
  getStats,
  getPieChartStats,
} from "../controllers/product.controllers.js";
const router = express.Router();

router.route("/get-transaction").get(getProductTransaction);
router.route("/getstats").get(getStats);
router.route("/pie-chart-stats").get(getPieChartStats);

export default router;
