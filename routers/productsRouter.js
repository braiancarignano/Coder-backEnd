const express = require("express");
const app = express();
const productsRouter = express.Router();
const { ProductManager } = require("../ProductManager");


productsRouter.get("/", function (req, res) {
  const limit = req.query.limit;
  let data = ProductManager.readFile();
  if (!data.length) {
    res.send([]);
}
  if (limit && !isNaN(Number(limit))) {
    data = data.slice(0, limit);
  }
  res.send(data);
});

productsRouter.get("/:id", function (req, res) {
  let product = ProductManager
    .readFile()
    .find((e) => e.id === Number(req.params.id));
  res.send(product);
});

productsRouter.post("/", (req, res) => {
  let producto = req.body.producto;
  let response = ProductManager.addProduct(producto);

  if (response.status) {
    res.send("Success!");
  } else {
    res.status("400").send("Server Error");
  }
});

productsRouter.put('/:id', (req, res) => {
	let updated = ProductManager.updateProduct(req.params.id, req.body);
	if (updated.status) {
		res.send('Product updated!');
	} else {
		res.status(404).send("Server Error");
	}
});

module.exports.productsRouter = productsRouter;