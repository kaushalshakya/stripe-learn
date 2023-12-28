const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  stripe_subscription_id: {
    type: String,
    required: [true, "stripe subscription id is required"],
  },
  customer_id: {
    type: [String],
  },
  status: {
    type: String,
    enum: ["Active", "Cancelled"],
  },
});

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

module.exports = Subscription;
