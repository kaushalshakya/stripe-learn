const router = require("express").Router();
const productControllers = require("../controllers/product.controller");

router.post("/", productControllers.addProduct);
router.get("/", productControllers.getProducts);

module.exports = router;
