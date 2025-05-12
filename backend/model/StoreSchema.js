const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 20,
    },
    address: {
      type: String,
      required: true,
      max: 50,
    },
    cost: {
      type: Number,
      required: true,
    },
    sell: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Store = mongoose.model("Stores", StoreSchema);

// Product.createIndexes();

module.exports = Store;
