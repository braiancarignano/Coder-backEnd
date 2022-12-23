const fs = require("fs");

let product = {
  title: "Smartphone",
  description: "Este es un producto prueba",
  price: 400,
  thumbnail: "Sin Imagen",
  code: "Smartphone123",
  stock: 12,
};

let cocaCola = {
  title: "Coca Cola",
  description: "Bebida",
  price: 300,
  thumbnail: "Sin Imagen",
  code: "Bebida123",
  stock: 500,
};
let teclado = {
  title: "Logitech",
  description: "Teclado 100% USB",
  price: 1500,
  thumbnail: "Sin Imagen",
  code: "Teclado123",
  stock: 5,
};

class ProductManager {
  path;
  constructor(path) {
    this.path = path;
    this.products = this.readFile();
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

  addProduct(item) {
    let items = this.readFile();
    if (items.find((e) => e.code === item.code)) {
      console.log("a CODE has already been assigned");
    } else {
      item.id = items.length > 0 ? items[items.length - 1].id + 1 : 1;
      items.push(item);
      this.writeData(items);
    }
  }
  getProductById(id) {
    let idItem = this.readFile().find((e) => e.id === id);
    if (idItem) {
      return console.log(idItem);
    }
    console.log("ID not found");
  }
  updateProduct(id, product) {
    let data = this.readFile();
    if (data.find((product) => product.id === id)) {
      let productDeleted = data.filter((product) => product.id !== id);
      product.id = id;
      productDeleted.push(product);
      this.writeData(productDeleted);
      return productDeleted;
    } else {
      console.log("The product to be updated does not exist");
    }
  }
  deleteProduct(id) {
    let products = this.readFile();
    if(product = products.filter((e) => e.id != id)){
    this.writeData(product);}
    console.log("ID not found")
  }
  deleteAll() {
    this.writeData([]);
  }
}
const productManager = new ProductManager("products.json");

// console.log(productManager.readFile());
// productManager.addProduct(product);
// productManager.addProduct(teclado);
// productManager.addProduct(cocaCola);
// productManager.getProductById(2);
// productManager.updateProduct(1,{
//   title: "Redragon",
//   description: "Mouse Inalambrico 16000 Dpi",
//   price: 1000,
//   thumbnail: "Sin Imagen",
//   code: "Mouse123",
//   stock: 8,
// })
// productManager.deleteProduct(1)
// productManager.deleteAll()
