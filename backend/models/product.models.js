import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    image: {
      type: String,
    },
    sold: {
      type: Boolean,
      default: false,
    },
    dateOfSale: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", schema);

export default Product;
