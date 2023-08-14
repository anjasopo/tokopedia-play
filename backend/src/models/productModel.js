const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productID: {
    type: String,
    required: true,
  },
  urlProduct: {
    type: String,
    required: true,
  },
  titleProduct: {
    type: String,
    required: true,
  },
  priceProduct: {
    type: Number,
    required: true,
  },
  videoID: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema, "Product");
