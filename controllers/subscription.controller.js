const Subscription = require("../models/subscription.model");
const catchAsync = require("../helper/catchAsync.helper");
const Error = require("../helper/error.helper");
const stripe = require("../configs/stripe.config");

exports.createSubscription = catchAsync(async (req, res, next) => {
  const customer = await stripe.customers.create({
    // source: token,
    email: "suzata_bazra@gmail.com",
    name: "Sujata Bajracharya",
    payment_method: "pm_card_visa",
    invoice_settings: {
      default_payment_method: "pm_card_visa",
    },
  });

  const newSubscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        price: req.body.stripe_plan_id,
      },
    ],
    payment_behavior: "default_incomplete",
    payment_settings: { save_default_payment_method: "on_subscription" },
    expand: ["latest_invoice.payment_intent"],
  });

  if (!newSubscription) {
    return next(new Error("Error creating subscription", 500));
  }

  const data = await Subscription.create({
    customer_id: customer.id,
    stripe_subscription_id: newSubscription.id,
  });

  return res.status(200).json({
    subscription: newSubscription.id,
    clientSecret: newSubscription.latest_invoice.payment_intent.client_secret,
    data,
  });
});

exports.listSubscription = catchAsync(async (req, res, next) => {
  const subscriptions = await stripe.subscriptions.list();

  return res.status(200).json(subscriptions);
});
