const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  plan_name: {
    type: String,
    required: [true, "Plan name is required"],
  },
  plan_price: {
    type: Number,
    required: [true, "Plan price is required"],
  },
  stripe_plan_id: {
    type: String,
    required: [true, "Enter stripe plan id"],
  },
});

const Plans = mongoose.model("Plan", PlanSchema);

module.exports = Plans;
