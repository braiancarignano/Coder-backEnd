const { generateProduct } = require("../config/utils.js");

const mockingProducts = async (req, res) => {
  try {
    let products = [];
    for (let i = 0; i < 100; i++) {
      products.push(generateProduct());
    }
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send("error");
  }
};
module.exports = { mockingProducts };
