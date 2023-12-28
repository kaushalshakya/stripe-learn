const router = require("express").Router();
const subscriptionController = require("../controllers/subscription.controller");

router.post("/", subscriptionController.createSubscription);
router.get("/", subscriptionController.listSubscription);
router.delete("/:id", subscriptionController.cancelSubscription);

module.exports = router;
