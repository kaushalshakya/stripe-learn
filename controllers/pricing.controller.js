const Pricing = require("../models/pricing.model");
const Error = require("../helper/error.helper");
const catchAsync = require("../helper/catchAsync.helper");
const stripe = require("../configs/stripe.config");

exports.newPricing = catchAsync(async (req, res, next) => {
  const product = await stripe.products.retrieve("prod_PBtOUUjsMlWbqA");
  const price = await stripe.prices.retrieve(product.default_price);

  const pricing = await stripe.prices.create({
    currency: "usd",
    product: "prod_PBtOUUjsMlWbqA",
    unit_amount: price.unit_amount,
    recurring: {
      interval: "month",
    },
  });

  if (!pricing) {
    return next(new Error("Error creating pricing", 400));
  }

  const data = await Pricing.create({
    stripe_product_id: "prod_PBtOUUjsMlWbqA",
    stripe_pricing_id: pricing.id,
  });

  return res.status(200).json({ pricing, data });
});
