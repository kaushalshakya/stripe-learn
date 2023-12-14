require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const stripeWebhook = async (req, res) => {
  try {
    const payload = req.body;

    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.WEBHOOK_SECRET;

    const event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);

    if (event.type === "payment_intent.created") {
      console.log("Payment intent created");
    }

    if (event.type === "payment_intent.succeeded") {
      console.log("Payment intent succeeded");
    }

    return res.json({ event });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "laude" });
  }
};

module.exports = stripeWebhook;
