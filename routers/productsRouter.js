const express = require("express");
const app = express();
const productsRouter = express.Router();
const { productManager } = require("../ProductManager");

productsRouter.get("/", function (req, res) {
  const limit = req.query.limit;
  let data = productManager.readFile();
  if (!data.length) {
    res.send([]);
}
  if (limit && !isNaN(Number(limit))) {
    data = data.slice(0, limit);
  }
  res.send(data);
});

productsRouter.get("/:id", function (req, res) {
  let product = productManager
    .readFile()
    .find((e) => e.id === Number(req.params.id));
  res.send(product);
});

productsRouter.post("/add", (req, res) => {
  let item = req.body;
 productManager.addProduct(item);

  if (item) {
    res.send("Product Add success");
  } else {
    res.status("400").send("Server Error");
  }
});

productsRouter.put('/update/:id', (req, res) => {
	productManager.updateProduct(Number(req.params.id), req.body);
		res.send("Product Update success");	
});

productsRouter.delete('/delete/:id', (req, res) => {
	productManager.deleteProduct(Number(req.params.id));
		res.send("Product Delete success");	
});

productsRouter.delete('/deleteAll', (req, res) => {
	productManager.deleteAll();
		res.send("All Product Delete success");	
});

module.exports.productsRouter = productsRouter;