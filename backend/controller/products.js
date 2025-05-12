const Product = require("../model/ProductSchema");

const addProduct = async (req, res) => {
  const { name, stock, manufacturer } = req.body;

  if (!name || !manufacturer) {
    return res.status(422).json({ error: "Please filled the all field" });
  } else {
    console.log(name, stock, manufacturer);
  }

  try {
    const newProduct = new Product({
      name,
      stock: 0,
      manufacturer,
    });

    const productAdd = await newProduct.save();
    if (productAdd) {
      const product = await Product.find();
      res.status(201).json(product);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const product = await Product.find();
    // const userId2 = await Post.find({},{userId:1, _id:0})
    res.status(200).json(product);
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

const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });
    console.log(product);
    if (!product) {
      return res.json({ message: `Product with userId ${id} not found` });
    }
    const deleted = await Product.findByIdAndDelete(product._id);
    if (deleted) {
      res.json({ message: `Product ${deleted} has been deleted Sucessfully` });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const updateProducts = async (req, res) => {
  const { id } = req.params;
  const { name, stock, manufacturer } = req.body;
  console.log("allData", name, stock, manufacturer, id);

  // if (!name || !stock || !manufacturer) {
  //   return res.status(422).json({ error: "Please fill all fields" });
  // }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, stock, manufacturer },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addProduct,
  getProducts,
  deleteProducts,
  updateProducts,
};
