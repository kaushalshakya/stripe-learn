const catchAsync = require("../helper/catchAsync.helper");
const Products = require("../models/product.model");
const Users = require("../models/user.model");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.payment = async (req, res) => {
  try {
    const productId = req.body.product_id;
    const productDetails = await Products.findById(productId);

    const amount = productDetails.product_price * 100;
    //Create a payment intent
    const intent = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      customer: "cus_PB6Ipc4bP371zG",
      automatic_payment_methods: { enabled: true },
    });

    return res.status(200).json({
      payment_intent: intent.id,
      clientSecret: intent.client_secret,
      amount,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.confirmPayment = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.confirm(
      req.body.payment_id,
      {
        payment_method: "pm_card_visa",
        return_url: "http://localhost:5173",
      }
    );

    const invoice = await stripe.invoices.create({
      customer: paymentIntent.customer,
    });

    return res.status(200).json({
      paymentIntent,
      invoice,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getPayments = async (req, res) => {
  try {
    const customers = await stripe.customers.list();
    return res.status(200).json({ customers });
  } catch (err) {
    console.log(err);
  }
};

exports.listInvoices = async (req, res) => {
  try {
    const invoices = await stripe.invoices.list();
    return res.status(200).json({ invoices });
  } catch (err) {
    console.log(err);
  }
};

exports.paymentMethods = catchAsync(async (req, res, next) => {
  const paymentMethod = await stripe.paymentMethods.list({
    type: "card",
  });
  return res.status(200).json(paymentMethod);
});
