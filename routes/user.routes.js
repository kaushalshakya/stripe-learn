const router = require("express").Router();
const userControllers = require("../controllers/user.controller");

router.post("/register", userControllers.registerUser);

module.exports = router;
