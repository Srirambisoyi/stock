const express = require("express");
const router = express.Router();
const products = require("../controller/products");

router.post("/", products.addProduct);
router.get("/", products.getProducts);
// router.get("/:id", products.getProductById);
router.delete("/:id", products.deleteProducts);
router.patch("/:id", products.updateProducts);

module.exports = router;
