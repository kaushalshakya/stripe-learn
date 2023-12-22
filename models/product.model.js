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
  stripe_product_id: {
    type: String,
  },
  stripe_pricing_id: {
    type: String,
  },
});

const Products = mongoose.model("Product", productSchema);

module.exports = Products;
