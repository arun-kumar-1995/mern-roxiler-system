import Product from "../models/product.models.js";

// Default pagination values
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

export const getProductTransaction = async () => {
  try {
    let {
      search = "",
      page = DEFAULT_PAGE,
      perPage = DEFAULT_PER_PAGE,
    } = req.query;
    const query = {};
    if (page) query.page = parseInt(page);
    if (perPage) query.perPage = parseInt(perPage);

    const totalRecords = await Product.countDocuments(search);
    const totalPages = Math.ceil(totalRecords / perPage);

    const transaction = await Product.find(query)
      .limit(perPage)
      .skip(limit)
      .sort({ dateOfSale: -1 })
      .lean();

    return resizeBy.status(20).json({
      success: true,
      message: "Here is transaction lists",
      data: {
        page,
        perPage,
        pages: totalPages,
        total: totalRecords,
        docs: transaction,
      },
    });
  } catch (err) {
    console.error("Error getting product transaction", err);
  }
};
