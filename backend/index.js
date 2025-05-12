const dotenv = require("dotenv");
const express = require("express");
const Users = require("./model/UsersSchema");
const productsRoutes = require("./routes/products");
const storesRoutes = require("./routes/stores");
const salesRoutes = require("./routes/sales");
const purchaseRoutes = require("./routes/purchase");

const app = express();
var cors = require("cors");

dotenv.config({ path: "./config.env" });

require("./db/conn");

app.use(express.json());
app.use(cors());
app.use("/products", productsRoutes);
app.use("/stores", storesRoutes);
app.use("/sales", salesRoutes);
app.use("/purchase", purchaseRoutes);
app.get("/", (req, res) => {
  res.send("This is home");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please filled the all field" });
  }

  try {
    const userExist = await Users.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exist!" });
    }

    const user = new Users({
      name,
      email,
      password,
    });

    const userReg = await user.save();

    if (userReg) {
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "please fill the data" });
    }

    const userLogin = await Users.findOne({ email: email });
    console.log(userLogin);

    if (!userLogin) {
      res.status(404).json({ error: "Please Signup first!" });
    } else {
      if (password == userLogin.password) {
        // res.status(200).send(req.body)
        res.status(200).json(userLogin);
      } else {
        res.status(404).json({ error: "incorrect password" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(4000, () => {
  console.log("server listen on port 4000");
});
