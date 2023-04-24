const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const app = express();
const PORT = 8080;
const passport = require("passport");
const initializePassport = require("./config/passportConfig.js");
const {
  LINK_DB,
  COOKIE_SECRET,
  SESSION_SECRET,
} = require("./config/config.js");
const cors = require("cors");
const { Server } = require("socket.io");
const { productsRouter } = require("./routes/products.router.js");
const { cartRouter } = require("./routes/carts.router.js");
const { userRouter } = require("./routes/user.router.js");
const { gitHubRouter } = require("./routes/gitHub.router.js");
const { mockingRouter } = require("./routes/mockingProducts.router.js");
const httpServer = app.listen(PORT, () => console.log(`Escuchando en ${PORT}`));
const socketServer = new Server(httpServer);

app.use(cookieParser(COOKIE_SECRET));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: LINK_DB,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 600,
    }),
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/sessions", userRouter);
app.use("/api/sessions", gitHubRouter);
app.use("/api/mockingproducts", mockingRouter);
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");
  socket.on("mensaje", (data) => {
    console.log(data);
  });
  socket.emit("mesagge", "Este mensaje es enviado desde el servidor a todos");
  // socket.on("productoNuevo", async (data)=>{
  //     modelProducts.create(data)
  // })
  // socket.on("idEliminar", (data)=>{
  //     modelProducts.deleteOne(data)
  // })
  // let products = modelProducts.find().lean()
  // socket.emit("products", products)
});

const environment = async () => {
  try {
    await mongoose.connect(LINK_DB);
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.log(error);
  }
};
environment();
