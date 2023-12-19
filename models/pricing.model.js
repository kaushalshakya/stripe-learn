const mongoose = require("mongoose");

const PricingSchema = new mongoose.Schema({
  stripe_product_id: {
    type: String,
  },
  stripe_pricing_id: {
    type: String,
  },
});

const Pricing = mongoose.model("pricing", PricingSchema);

module.exports = Pricing;
