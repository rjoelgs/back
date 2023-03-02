const express = require("express");

const router = express.Router();
const Product = require("../models/Products.model");

router.get('/', async(req, res) => {
  try {
    const products = await Product.find();
    res.status(200);
    res.send({
      result: products
    });
    
  } catch (error) {
    res.json(error)
    console.error(error);
  }
})

router.post('/', async(req, res) => {
  const addProduct = await new Product({
    sku: req.body.sku,
    title:req.body.title,
    src:req.body.src,
    des:req.body.des,
    price:req.body.price
  })
  addProduct.save();
  res.status(200).json({
    result:addProduct
  })
})


module.exports = router