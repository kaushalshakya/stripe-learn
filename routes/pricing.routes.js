const router = require("express").Router();
const pricingControllers = require("../controllers/pricing.controller");

router.post("/", pricingControllers.newPricing);

module.exports = router;
