const express = require("express");
const app = express();
const cartRouter = express.Router();
const modelCart = require("../models/carts.js");
const modelProducts = require("../models/products.js");

cartRouter.get("/", async (req, res) => {
  const data = await modelCart.find();
  res.json(data);
});

cartRouter.get("/:cid", async (req, res) => {
  let cid = req.params.cid;
  let data = await modelCart.findOne({ _id: cid });
  res.send(data);
});

cartRouter.post("/", async (req, res) => {
  const newCart = req.body;
  await modelCart.create(newCart);
  res.send("New cart add.");
});

cartRouter.put("/:cid/product/:pid", async (req, res) => {
  let cartId = req.params.cid;
  let productId = req.params.pid;

  const cartSelect = await modelCart.findOne({ _id: cartId });
  if (!cartSelect) {
    res.send("Cart not found.");
  }

  const productSelect = await modelProducts.findOne({ _id: productId });
  if (!productSelect) {
    res.send("Product not found.");
  }

  const idProductDB = productSelect._id;
  let newProductInCart = {
    IdProducto: idProductDB,
    quantity: 1,
  };

  const searchProductInCart = cartSelect.products.find(
    (e) => e.IdProducto.toString() === idProductDB.toString()
  );

  if (searchProductInCart) {
    cartSelect.products.map((e) => {
      if (e.IdProducto.toString() === idProductDB.toString()) {
        e.quantity++;
      }
    });
    await modelCart.updateOne({ _id: cartId }, cartSelect);
    res.send(cartSelect);
  } else {
    cartSelect.products.push({
      title: productSelect.title,
      ...newProductInCart,
    });
    await modelCart.updateOne({ _id: cartId }, cartSelect);
    res.send(cartSelect);
  }
});

cartRouter.delete("/delete/:cid/product/:pid", async (req, res) => {
  let cartId = req.params.cid;
  let productId = req.params.pid;

  const cartSelect = await modelCart.findOne({ _id: cartId });

  const productsNotDelete = cartSelect.products.filter(
    (e) => e.IdProducto.toString() !== productId.toString()
  );
  cartSelect.products = productsNotDelete;
  await modelCart.updateOne({ _id: cartId }, cartSelect);
  res.send({
    message: `Product in cart ${cartId} delete.`,
    cart: cartSelect,
  });
});

cartRouter.delete("/delete/:cid", async (req, res) => {
  let cartId = req.params.cid;
  const cartSelect = await modelCart.findOne({ _id: cartId });
  cartSelect.products = [];
  await modelCart.updateOne({ _id: cartId }, cartSelect);
  res.send({
    message: `All products in cart ${cartId} delete.`,
    cart: cartSelect,
  });
});

module.exports.cartRouter = cartRouter;
