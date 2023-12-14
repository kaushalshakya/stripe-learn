const paymentController = require("../controllers/payment.controller");
const router = require("express").Router();
const bodyParser = require("body-parser");

router.post("/", paymentController.payment);
router.post("/intent", paymentController.confirmPayment);
router.get("/", paymentController.getPayments);
router.get("/invoices", paymentController.listInvoices);
router.post(
  "/webhook",
  bodyParser.raw({ type: "*/*" }),
  paymentController.webhook
);

module.exports = router;
