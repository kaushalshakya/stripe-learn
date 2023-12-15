const Products = require("../models/product.model");
const stripe = require("../configs/stripe.config");

exports.addProduct = async (req, res) => {
  try {
    const stripeProduct = await stripe.products.create({
      name: req.body.product_name,
      default_price_data: {
        currency: "USD",
        unit_amount: req.body.product_price * 100,
      },
    });
    const product = await Products.create({
      ...req.body,
      stripe_product_id: stripeProduct.id,
    });
    return res.status(200).json({ product, stripeProduct });
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
