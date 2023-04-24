const modelCart = require("../models/carts.js");
const modelProducts = require("../models/products.js");

class Cart {
  getCart = async () => {
    try {
      const data = await modelCart.find();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  getCartById = async (id) => {
    try {
      const data = await modelCart.findById(id);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  createCart = async (cart) => {
    try {
      const data = await modelCart.create(cart);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  updateCart = async (cartId, productId) => {
    try {
      const cartSelect = await modelCart.findOne({ _id: cartId });
      const productSelect = await modelProducts.findOne({ _id: productId });
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
      } else {
        cartSelect.products.push({
          title: productSelect.title,
          ...newProductInCart,
        });
        await modelCart.updateOne({ _id: cartId }, cartSelect);
      }
      return cartSelect;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  deleteProduct = async (id) => {
    try {
      const cartSelect = await modelCart.findOne({ _id: id });
      const productsNotDelete = cartSelect.products.filter(
        (e) => e.IdProducto.toString() !== productId.toString()
      );
      cartSelect.products = productsNotDelete;
      await modelCart.updateOne({ _id: id }, cartSelect);
      return cartSelect;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  deleteProductsInCart = async (id) => {
    try {
      const cartSelect = await modelCart.findOne({ _id: id });
      cartSelect.products = [];
      await modelCart.updateOne({ _id: id }, cartSelect);
      return cartSelect;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
module.exports = Cart;
