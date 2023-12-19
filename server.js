const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {
  userRoutes,
  productRoutes,
  paymentRoutes,
  planRoutes,
  subscriptionRoutes,
  pricingRoutes,
} = require("./routes/index.routes");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const stripeWebhook = require("./controllers/stripe.controller");
const errorHandler = require("./middlewares/error.middleware");

app.use(cors());

app.post("/stripe-webhook", express.raw({ type: "*/*" }), stripeWebhook);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then((conn) => {
    console.log("Database >>> Connection established successfully");
  })
  .catch((err) => {
    throw new Error(err);
  });

app.get("/", async (req, res) => {
  return res.json({ message: "STRIPE" });
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/plans", planRoutes);
app.use("/api/v1/subscriptions", subscriptionRoutes);
app.use("/api/v1/pricing", pricingRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server >>> http://localhost:${PORT}`);
});
