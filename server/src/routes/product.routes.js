const router = require("express").Router();
const controller = require("../controllers/product.controller");

router.get("/", controller.getProducts);
router.get("/:id", controller.getProduct);
router.post("/create", controller.createProduct);

module.exports = router;
