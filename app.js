const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const PORT = 8080;
const { Server } = require("socket.io")
const { productManager } = require("./controllers/ProductManager");
const { productsRouter } = require("./routers/productsRouter");
const { cartRouter } = require("./routers/cartsRouter");
const {viewsRouter} = require("./routers/views.router.js");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);

const httpServer = app.listen(PORT, () => console.log(`Escuchando en ${PORT}`));
const socketServer = new Server(httpServer)

//handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use("/", viewsRouter);


socketServer.on("connection", socket => {
    console.log("Nuevo cliente conectado")
    socket.on("mensaje", data => {
        console.log(data)
    })
    socket.emit("mesagge", "Este mensaje es enviado desde el servidor a todos")
    socket.on("productoNuevo", (data)=>{
        productManager.addProduct(data)
    })
    socket.on("idEliminar", (data)=>{
        productManager.deleteProduct(data)
    })
    let products = productManager.readFile()
    socket.emit("products", products)
   
})




