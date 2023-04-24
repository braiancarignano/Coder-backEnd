const express = require("express");
const passport = require("passport");
const userRouter = express.Router();

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
    if (!req.user)
      return res
        .status(400)
        .send({ status: "error", error: "Usuario no encontrado" });
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
      rol: req.user.rol,
    };
    req.session.admin = true;
    return res.status(200).send({ message: "success", user: req.session.user });
  }
);

userRouter.get("/faillogin", async (req, res) => {
  res.send({ error: "Failed Strategy" });
});

userRouter.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(401).send({ message: "ERROR" });
    } else {
      res.status(200).send({ message: "LogoutOK" });
    }
  });
});

module.exports.userRouter = userRouter;
