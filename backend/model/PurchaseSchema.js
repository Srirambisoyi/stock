const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema(
  {
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
    stock: {
      type: Number,
      required: true,
    },
    total_purchase_amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Purchase = mongoose.model("Purchase", PurchaseSchema);

// Product.createIndexes();

module.exports = Purchase;
