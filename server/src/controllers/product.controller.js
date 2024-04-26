const mongoose = require("mongoose");
const Product = require("../models/product.model");

async function getProduct(req, res, next) {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid product ID ❌");
    error.status = 400;
    return next(error);
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      const error = new Error("Product not found ❌");
      error.status = 404;
      return next(error);
    }

    return res.status(200).json({
      message: "Product retrieved successfully ✅",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return next(new Error()); // just throw an internal server error
  }
}

async function getProducts(req, res, next) {
  const limit = req.query.limit || 10;
  try {
    const products = await Product.find({}).limit(limit);
    return res.status(200).json({
      message: `${products.length} products retrieved successfully ✅`,
      data: products,
    });
  } catch (error) {
    console.error(error);
    return next(new Error()); // just throw an internal server error
  }
}

async function createProduct(req, res, next) {
  const { partNumber, title, description, image, price } = req.body;

  const missingFields = [];
  if (!partNumber) missingFields.push("partNumber");
  if (!title) missingFields.push("title");
  if (!description) missingFields.push("description");
  if (!image) missingFields.push("image");
  if (!price) missingFields.push("price");
  if (missingFields.length > 0) {
    const error = new Error(`Missing required data: [${missingFields.join(",")}] ❌`);
    error.status = 400;
    return next(error);
  }

  try {
    // TODO: sadfhjkasdhfkljasdfhjklasdhfkljasdhfjklasdhfkjlasdhfjklasdfhjklsd
  } catch (error) {
    console.error(error);
    return next(new Error()); // just throw an internal server error
  }
}

module.exports = { getProduct, getProducts, createProduct };
