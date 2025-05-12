const express = require("express");
const router = express.Router();
const purchase = require("../controller/purchase");

router.post("/", purchase.addPurchase);
router.get("/", purchase.getPurchases);
// router.get("/:id", products.getProductById);
router.delete("/:id", purchase.deletePurchase);
router.put("/:id", purchase.updatePurchase);

module.exports = router;
