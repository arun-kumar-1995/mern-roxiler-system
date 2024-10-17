import express from "express";
import {
  getProductTransaction,
  getStats,
} from "../controllers/product.controllers.js";
const router = express.Router();

router.route("/get-transaction").get(getProductTransaction);
router.route("/getstats").get(getStats);

export default router;
