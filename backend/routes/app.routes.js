import express from "express";
import { getProductTransaction } from "../controllers/product.controllers.js";
const router = express.Router();

router.route("/get-transaction").get(getProductTransaction);

export default router;
