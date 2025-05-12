const Sale = require("../model/SaleSchema");
const Product = require("../model/ProductSchema");
const Purchase = require("../model/PurchaseSchema");
const Store = require("../model/StoreSchema");

const addSale = async (req, res) => {
  const { products_id, store_id, total_sale_amount, quantity } = req.body;

  if (!products_id || !store_id || !total_sale_amount || !quantity) {
    return res.status(422).json({ error: "Please filled the all field" });
  } else {
    console.log(products_id, store_id, total_sale_amount, quantity);
  }

  const productIds = products_id.map((item) => {
    return item.value;
  });

  const productQuan = quantity.split(",").map((str) => Number(str));

  // console.log("===>>>>>", productIds);

  try {
    const purchases = await Purchase.find({
      product_id: { $in: productIds },
    }).populate("product_id");

    // const purchaseAmountPerUnit = productQuan.map((q) => {
    //   return purchases.total_purchase_amount / parseInt(q);
    // });
    let totalPurchase = 0;
    for (let i = 0; i < purchases.length; i++) {
      const purchase = purchases[i];
      const perUnit =
        purchase.total_purchase_amount / purchase.product_id.stock;
      totalPurchase += perUnit * productQuan[i];
      // console.log(
      //   `Ratio for purchase ${i + 1}: ${perUnit}`,
      //   perUnit * productQuan[i]
      // );
    }

    // const productsArr = products.map((obj) => {
    //   return obj.products_id;
    // });

    console.log("----", productQuan);

    const newSale = new Sale({
      products_id: productIds,
      store_id,
      quantity: productQuan,
      total_sale_amount,
    });

    const saleAdd = await newSale.save();
    if (saleAdd) {
      const store = await Store.findOneAndUpdate(
        { _id: store_id },
        { $inc: { cost: totalPurchase, sell: total_sale_amount } },
        { new: true }
      );
      // const product = await Product.findOneAndUpdate(
      //   { _id: { $in: productIds } },
      //   { $inc: { stock: { $in: -productQuan } } },
      //   { new: true }
      // );
      // console.log(productIds, productQuan);
      for (let i = 0; i < productIds.length; i++) {
        const productId = productIds[i];
        const product = await Product.findById(productId);
        const newStock = product.stock - productQuan[i];
        // console.log("+++", productId, product);
        await Product.findOneAndUpdate(
          { _id: productId },
          { $set: { stock: newStock } },
          { new: true }
        );
      }

      const sale = await Sale.find();
      res.status(201).json(sale);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate("store_id");

    res.status(200).json(sales);
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

// const deleteProducts = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findOne({ _id: id });
//     console.log(product);
//     if (!product) {
//       return res.json({ message: `Product with userId ${id} not found` });
//     }
//     const deleted = await Product.findByIdAndDelete(product._id);
//     if (deleted) {
//       res.json({ message: `Product ${deleted} has been deleted Sucessfully` });
//     }
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// };

// const updateProducts = async (req, res) => {
//   const { id } = req.params;
//   const { name, stock, manufacturer } = req.body;

//   // if (!name || !stock || !manufacturer) {
//   //   return res.status(422).json({ error: "Please fill all fields" });
//   // }

//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(
//       id,
//       { name, stock, manufacturer },
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     const products = await Product.find();
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const updateSale = async (req, res) => {
  const { id } = req.params;
  const { products_id, store_id, quantity, total_sale_amount } = req.body;

  try {
    const updatedSale = await Sale.findByIdAndUpdate(
      id,
      { products_id, store_id, quantity, total_sale_amount },
      { new: true, runValidators: true }
    );

    if (!updatedSale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    res.status(200).json(updatedSale);
  } catch (error) {
    res.status(500).json({ message: "Error updating sale", error });
  }
};

// Delete Sale
const deleteSale = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSale = await Sale.findByIdAndDelete(id);

    if (!deletedSale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    res.status(200).json({ message: "Sale deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting sale", error });
  }
};

module.exports = {
  addSale,
  getSales,
  updateSale,
  deleteSale,
};
