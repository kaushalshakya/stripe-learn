const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_price: {
    type: Number,
    required: true,
  },
});

const Products = mongoose.model("Product", productSchema);

module.exports = Products;
