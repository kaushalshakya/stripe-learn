const bcrypt = require("bcrypt");
const Users = require("../models/user.model");
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
