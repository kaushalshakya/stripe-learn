const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  stripe_subscription_id: {
    type: String,
    required: [true, "stripe subscription id is required"],
  },
  customer_id: {
    type: [String],
  },
});

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

module.exports = Subscription;
