const express = require("express");
const router = express.Router();
stores = require("../controller/stores");

router.post("/", stores.addStore);
router.get("/", stores.getStores);
// router.get("/:id", products.getProductById);
router.delete("/:id", stores.deleteStores);
router.put("/:id", stores.updateStores);

module.exports = router;
