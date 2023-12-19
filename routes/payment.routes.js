const paymentController = require("../controllers/payment.controller");
const router = require("express").Router();

router.post("/", paymentController.payment);
router.post("/intent", paymentController.confirmPayment);
router.get("/", paymentController.getPayments);
router.get("/invoices", paymentController.listInvoices);
router.get("/method", paymentController.paymentMethods);

module.exports = router;
