const mongoose = require("mongoose");
const Schema = mongoose.Schema

const product = new Schema ({
    article: String,
    description: String,
    url_img: String,
    price: Number,
    category: String,
    stock: Number
},
{ versionKey: false}
);
module.exports = mongoose.model("Products", product);