const express = require("express");
const app = express();
const productsRouter = express.Router();
const modelProducts = require("../models/products.js");

productsRouter.get("/", async (req, res) => {
  const stock = req.query.stock;
  const page = req.query.page;
  const limit = req.query.limit || 10;
  const sort = req.query.sort || 1;
  let query;
  let prevURL;
  let nextURL;
  const url = req.protocol + "://" + req.get("host") + req.originalUrl;
  const category = req.query.category;
  if (category != undefined || stock != undefined) {
    if (category != undefined) {
      query = { category: category };
    } else {
      query = { stock: stock };
    }
  } else {
    if (category != undefined && stock != undefined) {
      query = { category: category, stock: stock };
    } else {
      query = {};
    }
  }
  let data = await modelProducts.paginate(
    query,
    {
      page: page || 1,
      limit: limit,
      sort: { price: sort },
    },
    (err, res) => {
      res.hasPrevPage
        ? (prevURL = url.replace(`page=${res.page}`, `page=${res.prevPage}`))
        : null;
      res.hasNextPage
        ? (nextURL =
            page == undefined
              ? url.concat(`&page=${res.nextPage}`)
              : url.replace(`page=${res.page}`, `page=${res.nextPage}`))
        : null;
      return {
        status: res.docs.length != 0 ? "success" : "error",
        payload: res.docs,
        totalPages: res.totalPages,
        prevPage: res.prevPage,
        nextPage: res.nextPage,
        page: res.page,
        hasPrevPage: res.hasPrevPage,
        hasNextPage: res.hasNextPage,
        prevLink: prevURL,
        nextLink: nextURL,
      };
    }
  );
  res.send(data);
});

productsRouter.get("/:pid", async (req, res) => {
  let id = req.params.pid;
  let data = await modelProducts.findOne({ _id: id });
  res.send(data);
});

productsRouter.post("/", async (req, res) => {
  let newProduct = req.body;
  await modelProducts.create(newProduct);
  res.send("New product add.");
});

productsRouter.put("/update/:pid", async (req, res) => {
  let id = req.params.pid;
  const dataUpdate = await req.body;
  await modelProducts.findByIdAndUpdate({ _id: id }, dataUpdate);
  res.send(`Producto "${id}" actualizado`);
});

productsRouter.delete("/delete/:pid", async (req, res) => {
  let id = req.params.pid;
  await modelProducts.deleteOne({ _id: id });
  res.send(`Producto "${id}" eliminado`);
});

module.exports.productsRouter = productsRouter;
