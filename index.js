class ProductManager {
  products;
  static id = 0;
  constructor(title, description, price, thumbnail, code, stock) {
    this.products = [];
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
  addProduct() {
    let repeatProduct = this.products.find(
      (product) => product.code === this.code
    );
    if (repeatProduct) {
      return console.log("//////////------ ERROR: CODE ya asignado a otro producto. ------//////////");
    } else {
      let id = (ProductManager.id += 1);
      this.products.push(product, id);
    }
  }
  getProducts() {
    return this.products;
  }
  getProductById(id) {
    let reserchId = this.products.find((product) => product.id === id);
    return reserchId;
  }
}
const product = new ProductManager(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin Imagen",
  "abc123",
  25
);
console.log(
  "<========== mostrar array vacio ==========>",
  product.getProducts()
);
//Agrega producto al array
product.addProduct();
console.log(
  "<========== mostrar array con producto ==========>",
  product.getProducts()
);
//Muestra el error al intentrar crear otro producto con mismo CODE
product.addProduct();
console.log(
  "<========== mostrar si se encuentra el id ==========>",
  product.getProductById()
);
