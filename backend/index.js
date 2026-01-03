const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");


//Configuraciones
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


//Mongoose

mongoose
  .connect(process.env.STRING_CONEXION)
  .then(function (db) {
    console.log("Conectado a la base de datos");
  })
  .catch(function (err) {
    console.log(err);
  });
//Modelos
const Product = require("./models/products");
const Purchase = require("./models/purchases")
const User = require("./models/users")

/* -------------------- Users ---------------------------- */

app.get("/users", async function(req, res){
  const users = User.find();
  res.status(200).send(users);
});
 
//Register
app.post("/register", async (req, res) => {
  const { name, email, password, role} = req.body;

  const data = {
    name: name,
    email: email,
    password: password,
    role: role,
    date: new Date(),
  };
  const user = new User(data);
  await user.save();
  const token = jwt.sign({ _id: user._id }, "secretKey");
  res.status(200).json({ token });
});

//Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send("This email doesn't exist");
  if (user.password !== password)
    return res.status(401).send("Incorrect password");

  const token = jwt.sign({ _id: user._id }, "secretKey");
  return res.status(200).json({ token });
});

app.get("/role/:email", async function (req, res) {
  const email = req.params.email;
  const user = await User.findOne({ correo: email });
  res.send({ role: user.role });
});


/* -------------------- Products ---------------------------- */


//Get Products
app.get("/products", async function(req,res){
  const product = await Product.find();
  res.send(product);
});

//Products details
app.get("/product/:id", async function (req, res) {
  const id = req.params.id;
  const selected_product = await Product.findById({_id: id});
  res.send(selected_product);
});

//Insert the products in the shopping cart
app.post("/insert_purchase", async function (req, res) {
  const { id_product, amount, unit_price, name_product } = req.body;
  
  const purchase = {
    id_product: id_product,
    name_product: name_product,
    unit_price: parseInt(unit_price),
    amount: parseInt(amount),
    total: parseInt(unit_price) * parseInt(amount),
    date: new Date(),
  };
  const shopping_cart = new Purchase(purchase);
  await shopping_cart.save();
  res.send({msg: "Added to shopping cart"});
});

//Show the shopping basket
app.get("/shop_basket", async function (req, res) {
  const shopping_cart = await Purchase.find();
  res.send(shopping_cart)
});

//Delete Product
app.delete("/delete_product/:id_producto", async function (req, res) {
  const id = req.params.id_producto;
  await Purchase.findByIdAndRemove(id);
  res.send({msg: "Removed successfully"});
});


//Show the selected category
app.get("/category/:cat", async function (req, res) {
  const category = req.params.cat;
  const products = await Product.find({ category: category });
  res.send(products)
});

//Listen
app.listen("4000", function (){
    console.log("Servidor iniciado");
});