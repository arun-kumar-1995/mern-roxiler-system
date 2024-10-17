import axios from "axios";
import Product from "../models/product.models.js";
const fetchSeedData = async () => {
  try {
    // make get request
    const response = await axios.get(process.env.SEED_DATA_URL);
    const seedData = response.data;

    // insert into database
    seedData.forEach(async (product) => {
      console.log(product);
      if (product.dateOfSale) {
        product.dateOfSale = new Date(product.dateOfSale);
      }
      await Product.insertMany(product);
    });
  } catch (err) {
    console.error("Failed to fetch seed data", err.message);
  }
};

export default fetchSeedData;
