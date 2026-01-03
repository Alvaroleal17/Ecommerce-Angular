const mongoose = require("mongoose");
const Schema = mongoose.Schema

const shop_basket = new Schema ({
  id_product: String,
  name_product: String,
  unit_price: Number,
  amount: Number,
  total: Number,
  date: String,
},
{ versionKey: false}
);
module.exports = mongoose.model("Purchases", shop_basket);