const fs = require("fs");
const { productManager } = require("./ProductManager");
class CartManager {
  path;
  constructor(path) {
    this.path = path;
    this.carts = this.readFile();
  }
  readFile() {
    const data = JSON.parse(fs.readFileSync(`./${this.path}`, "utf-8"));
    return data;
  }

  writeData(data) {
    let dataString = JSON.stringify(data);
    fs.writeFileSync(`./${this.path}`, dataString);
    return dataString;
  }

  addCart() {
    let carts = this.readFile();
    let cart = {
      products: [],
      id: 1,
    };
    if (carts.length === 0) {
      this.carts.push(cart);
      this.writeData(this.carts);
    } else if (carts.length > 0) {
      let idNew = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
      let cart = {
        products: [],
        id: idNew,
      };
      this.carts.push(cart);
      this.writeData(this.carts);
    }
  }
  getCartById(id) {
    let idItem = this.readFile().find((e) => e.id === id);
    if (idItem) {
      return console.log(idItem);
    }
    console.log("ID not found");
  }
  addProductCart(cid,pid,quantity) {
    let productId = productManager.readFile().find((e) => e.id === pid)
    let productIds = productId.id
    let cartId=this.carts.find((cart) => cart.id === cid)
    let products = Object.values(cartId)
    let productsInCart = products[0]

    if (!cartId) {
      console.log("ID Cart not found")
    }
    else if(cartId){ 
      console.log(productsInCart)
      let productUpdate = this.carts.filter((cart) => cart.id !== cid);
      let cartNew = {
        products: [],
        id: cid,
      };
      productUpdate.push(cartNew);
      this.writeData(productUpdate);
    }
  }
  deleteCart(id) {
    let cart = this.readFile();
    let cartDelete = cart.filter((e) => e.id != id)
    if (cartDelete.length < cart.length) {
      this.writeData(cartDelete);
    }
    else{console.log("ID not found");} 
  }
}

const cartManager = new CartManager("./database/carts.json");
cartManager.addProductCart(3,1)
module.exports = {
  cartManager: cartManager,
};
