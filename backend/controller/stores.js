const Store = require("../model/StoreSchema");

const addStore = async (req, res) => {
  const { name, address, cost, sell } = req.body;

  if (!name || !address || !cost || !sell) {
    return res.status(422).json({ error: "Please filled the all field" });
  } else {
    console.log(address);
  }

  try {
    const newStore = new Store({
      name,
      address,
      cost,
      sell,
    });

    const storeAdd = await newStore.save();
    if (storeAdd) {
      const product = await Store.find();
      res.status(201).json(product);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getStores = async (req, res) => {
  try {
    const stores = await Store.find();
    // const userId2 = await Post.find({},{userId:1, _id:0})
    res.status(200).json(stores);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const updateStores = async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Store.findByIdAndUpdate(id, req.body, { new: true });

    if (!store) {
      return res.status(404).json({ successs: false });
    }

    return res.status(200).json({ msg: "updated" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server error" });
  }
};
const deleteStores = async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Store.findByIdAndDelete(id);
    return res.status(200).json({ message: "Store Deleted" });
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

module.exports = {
  addStore,
  getStores,
  updateStores,
  deleteStores,
};
