const express = require("express");
const app = express();
const cartRouter = express.Router();
const { cartManager } = require("../cartManager");

cartRouter.get("/:cid", function (req, res) {
  let cart = cartManager
    .readFile()
    .find((e) => e.id === Number(req.params.cid));
  res.send(cart);
});

cartRouter.post("/", (req, res) => {
   cartManager.addCart();
      res.send("Cart Add success");
  });

cartRouter.post("/:cid/product/:pid ", (req, res) => {
    let cart = cartManager
    .readFile()
    .find((e) => e.id === Number(req.params.cid));
    
 cartManager.addCart();

  if (item) {
    res.send("Cart Add success");
  } else {
    res.status("400").send("Server Error");
  }
});


cartRouter.delete('/delete/:id', (req, res) => {
	cartManager.deleteCart(Number(req.params.id));
		res.send("Cart Delete success");	
});


module.exports.cartRouter = cartRouter;