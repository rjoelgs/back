const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  sku: {type: String},
  title: String,
  des: { type: String },
  src: String,
  price: Number,
  createdAt: { type: String, default: Date.now }
});

const Product= mongoose.model("Products", ProductSchema);

module.exports = Product;