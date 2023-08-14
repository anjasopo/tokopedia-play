const Product = require("../models/productModel");

const getAllProducts = async (req, res) => {
  try {
    const { search, videoID } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { productID: { $regex: search, $options: "i" } },
        { titleProduct: { $regex: search, $options: "i" } },
      ];
    }

    if (videoID) {
      query.videoID = { $regex: videoID, $options: "i" };
    }

    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({ productID: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
