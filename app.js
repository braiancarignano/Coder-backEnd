const express = require('express')
const {productManager} = require("./ProductManager")
const app = express()

app.get('/products', function (req, res) {
  const limit = req.query.limit;
  let data = productManager.readFile();
  if (limit && !isNaN(Number(limit))) {
    data = data.slice(0, limit);
  }
  res.send(data);
})

app.get('/products/:id', function (req, res) {
  let product = productManager.readFile().find((e) => e.id === Number(req.params.id));
 res.send(product)
})

app.listen(3000)