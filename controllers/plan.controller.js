const Plans = require("../models/plan.model");
const stripe = require("../configs/stripe.config");
const AppError = require("../helper/error.helper");
const catchAsync = require("../helper/catchAsync.helper");

exports.createPlan = catchAsync(async (req, res, next) => {
  const { amount, currency, interval, name, nickname } = req.body;

  const plan = await stripe.plans.create({
    amount,
    currency,
    interval,
    product: {
      name,
    },
    nickname,
  });

  if (!plan) {
    throw next(new AppError("error creating plan", 500));
  }

  const createPlan = await Plans.create({
    ...req.body,
    stripe_plan_id: plan.id,
  });

  return res.status(200).json({
    status: 200,
    message: "Plan created",
    plan,
    createPlan,
  });
});
