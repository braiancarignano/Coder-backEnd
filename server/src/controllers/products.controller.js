const Product = require("../dao/classes/products.dao.js");
const ProductService = new Product();

const getProduct = async (req, res) => {
  const stock = req.query.stock;
  const page = req.query.page;
  const limit = req.query.limit || 10;
  const sort = req.query.sort || 1;
  const url = req.protocol + "://" + req.get("host") + req.originalUrl;
  const category = req.query.category;
  let result = await ProductService.getProduct(
    stock,
    page,
    limit,
    sort,
    url,
    category
  );
  if (!result)
    return res
      .status(500)
      .send({ status: "error", message: "Something went wrong" });
  res.send({ status: "success", result });
};
const getProductById = async (req, res) => {
  let pid = req.params.pid;
  let result = await ProductService.getProductById(pid);
  if (!result)
    return res
      .status(404)
      .send({ status: "error", message: "Something went wrong" });
  res.send({ status: "success", result });
};
const createProduct = async (req, res) => {
  const product = req.body;
  let result = await ProductService.createProduct(product);
  if (!result)
    return res
      .status(404)
      .send({ status: "error", message: "Something went wrong" });
  res.send({ status: "success", result });
};

const updateProduct = async (req, res) => {
  let id = req.params.pid;
  const product = await req.body;
  let result = await ProductService.updateProduct(id, product);
  if (!result)
    return res
      .status(404)
      .send({ status: "error", message: "Something went wrong" });
  res.send({ status: "success", result });
};

const deleteProduct = async (req, res) => {
  let id = req.params.pid;
  let result = await ProductService.deleteProduct(id);
  if (!result)
    return res
      .status(404)
      .send({ status: "error", message: "Something went wrong" });
  res.send({ status: "success", result });
};

module.exports = {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
