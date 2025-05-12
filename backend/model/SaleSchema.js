const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema(
  {
    products_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
    store_id: { type: mongoose.Schema.Types.ObjectId, ref: "Stores" },
    quantity: {
      type: [Number],
      required: true,
    },
    total_sale_amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Sale = mongoose.model("Sales", SaleSchema);

// Product.createIndexes();

module.exports = Sale;
