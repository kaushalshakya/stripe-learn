const router = require("express").Router();
const subscriptionController = require("../controllers/subscription.controller");

router.post("/", subscriptionController.createSubscription);
router.get("/", subscriptionController.listSubscription);

module.exports = router;
