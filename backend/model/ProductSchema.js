const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 20,
    },
    manufacturer: {
      type: String,
      required: true,
      max: 20,
    },
    stock: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Products", ProductSchema);

// Product.createIndexes();

module.exports = Product;
