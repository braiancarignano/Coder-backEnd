const express = require("express");
const passport = require("passport");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { passportCall, authorization } = require("../config/utils");
const { SESSION_SECRET } = require("../config/config");

userRouter.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/failregister",
  }),
  async (req, res) => {
    res.send({
      status: "success",
      message: "Usuario creado correctamente",
    });
  }
);

userRouter.get("/failregister", async (req, res) => {
  res.send({ error: "Failed Strategy" });
});

userRouter.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/faillogin",
  }),
  async (req, res) => {
    if (!req.user) {
      return res
        .status(400)
        .send({ status: "error", error: "Usuario no encontrado" });
    }
    const username = req.user.email;
    const cart = req.user.cart;
    const firtsname = req.user.first_name;
    const lastname = req.user.last_name;
    const rol = req.user.rol;
    const myToken = jwt.sign(
      { username, cart, firtsname, lastname, rol },
      SESSION_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res
      .cookie("CookieToken", myToken, {
        maxAge: 60 * 60 * 1000,
      })
      .send({ message: "Loggeg in!" });
  }
);

userRouter.get(
  "/current",
  passportCall("jwt"),
  authorization("Consumer"),
  (req, res) => {
    const decoded = jwt.verify(req.cookies.CookieToken, SESSION_SECRET);
    res.send(decoded);
  }
);

userRouter.get("/faillogin", async (req, res) => {
  res.send({ error: "Failed Strategy" });
});

module.exports.userRouter = userRouter;
