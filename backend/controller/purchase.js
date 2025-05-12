const Purchase = require("../model/PurchaseSchema");
const Product = require("../model/ProductSchema");

const addPurchase = async (req, res) => {
  const { product_id, stock, total_purchase_amount } = req.body;

  if (!product_id || !stock || !total_purchase_amount) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }

  try {
    const newPurchase = await new Purchase({
      product_id: product_id.value,
      stock,
      total_purchase_amount,
    });

    const purchaseAdd = await newPurchase.save();
    if (purchaseAdd) {
      const product = await Product.findOneAndUpdate(
        { _id: product_id.value },
        { $inc: { stock: stock } },
        { new: true }
      );
      res.status(201).json({ purchase: purchaseAdd, product: product });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find().populate("product_id");
    res.status(200).json(purchases);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// const getProductById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findOne({ _id: id });
//     console.log(product);
//     res.status(200).json(product);
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// };

const updatePurchase = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, stock, total_purchase_amount } = req.body;

    const updatedPurchase = await Purchase.findByIdAndUpdate(
      id,
      { product_id, stock, total_purchase_amount },
      { new: true, runValidators: true }
    );

    if (!updatedPurchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    res.status(200).json(updatedPurchase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Purchase Controller
const deletePurchase = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPurchase = await Purchase.findByIdAndDelete(id);

    if (!deletedPurchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    res.status(200).json({ message: "Purchase deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addPurchase,
  getPurchases,
  updatePurchase,
  deletePurchase,
};
