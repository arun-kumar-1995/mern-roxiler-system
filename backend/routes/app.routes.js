import express from "express";
import { getProductTransaction } from "../controllers/product.controllers";
const router = express.Router();

router.route("/get-transaction").get(getProductTransaction);

export default router;
