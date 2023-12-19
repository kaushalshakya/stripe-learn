const bcrypt = require("bcrypt");
const Users = require("../models/user.model");
const catchAsync = require("../helper/catchAsync.helper");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.registerUser = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // const stripteCustomer = await stripe.customers.create({
    //   description: "Test Stripe User",
    //   name: req.body.name,
    //   email: req.body.email,
    // });

    //create a customer with a nested object

    const stripeCustomer = await stripe.customers.create({
      payment_method: "pm_card_visa",
      invoice_settings: {
        default_payment_method: "pm_card_visa",
      },
    });

    const data = {
      ...req.body,
      password: hash,
      stripe_customer_id: stripeCustomer.id,
    };
    const user = await Users.create(data);

    return res.status(200).json({
      user,
    });
  } catch (err) {
    console.log(err);
  }
};

// exports.token = catchAsync(async (req, res, next) => {
//   const token = await stripe.tokens.create({
//     card: {
//       number: "4242424242424242",
//       exp_month: 12,
//       exp_year: 2024,
//       cvc: "123",
//     },
//   });
//   return res.status(200).json(token);
// });

exports.updateUser = catchAsync(async (req, res, next) => {
  try {
    // Create a payment method using the test token
    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: "4242424242424242",
        exp_month: 12,
        exp_year: 34,
        cvc: "314",
      },
    });

    // Attach the payment method to the customer
    await stripe.paymentMethods.attach(paymentMethod.id, {
      customer: "cus_PB6Ipc4bP371zG",
    });

    // Update the customer's default payment method
    const updatedUser = await stripe.customers.update("cus_PB6Ipc4bP371zG", {
      invoice_settings: {
        default_payment_method: paymentMethod.id,
      },
    });

    return res.status(200).json({ updatedUser });
  } catch (error) {
    console.log(error);

    // Handle the error appropriately
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
