const router = require("express").Router();
const planController = require("../controllers/plan.controller");

router.post("/", planController.createPlan);
router.get("/", planController.plans);

module.exports = router;
