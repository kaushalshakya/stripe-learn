const Products = require("../models/product.model");

exports.addProduct = async (req, res) => {
  try {
    const product = await Products.create(req.body);
    return res.status(200).json({ product });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    return res.status(200).json({ products });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
