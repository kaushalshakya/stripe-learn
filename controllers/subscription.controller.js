const Subscription = require("../models/subscription.model");
const catchAsync = require("../helper/catchAsync.helper");
const Error = require("../helper/error.helper");
const stripe = require("../configs/stripe.config");

exports.createSubscription = catchAsync(async (req, res, next) => {
  const { token } = req.body;

  const customer = await stripe.customers.create({
    source: token,
    email: "kshakya101@gmail.com",
    payment_method: "pm_card_visa",
    invoice_settings: {
      default_payment_method: "pm_card_visa",
    },
  });

  console.log(customer);

  const newSubscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        price: "price_1OOdBFIvMqLok6Sny6aTZdUS",
      },
    ],
  });

  if (!newSubscription) {
    return next(new Error("Error creating subscription", 500));
  }

  const data = await Subscription.create({
    customer_id: customer.id,
    stripe_subscription_id: newSubscription.id,
  });

  return res.status(200).json({ data, newSubscription });
});

exports.listSubscription = catchAsync(async (req, res, next) => {
  const subscriptions = await stripe.subscriptions.list({
    type: "card",
  });

  return res.status(200).json(subscriptions);
});
