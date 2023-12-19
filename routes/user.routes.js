const router = require("express").Router();
const userControllers = require("../controllers/user.controller");

router.post("/register", userControllers.registerUser);
router.patch("/", userControllers.updateUser);
// router.get("/", userControllers.token);

module.exports = router;
