const fs = require("fs");

class CartManager {
  path;
  constructor(path) {
    this.path = path;
    this.carts = [];
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
    if (carts.length === 0) {
      let cart = {
        products: [],
        id: 1,
      };
      this.carts.push(cart);
      this.writeData(this.carts)
    }
    else if (carts.length > 0){
       let idNew = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
        let cart = {
            products: [],
            id: idNew,
          };
          this.carts.push(cart);
          this.writeData(this.carts)

    }
  }
}

const cartManager = new CartManager("./database/carts.json");
cartManager.addCart()

module.exports = {
  cartManager: cartManager,
};
