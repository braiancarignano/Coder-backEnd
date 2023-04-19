const passport = require("passport");
const local = require("passport-local");
const GithubStrategy = require("passport-github2");
const { isValidPassword, createHash } = require("./utils.js");
const Cart = require("../dao/classes/carts.dao.js");
const CartService = new Cart();
const User = require("../dao/classes/users.dao.js");
const UserService = new User();
const LocalStrategy = local.Strategy;
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = require("./config.js");

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          const user = await UserService.searchUser(username);
          const carts = await CartService.createCart();
          if (user)
            return done(null, false, { message: "El usuario ya existe" });
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            cart: carts,
          };
          const response = await UserService.createUser(newUser);
          return done(null, response);
        } catch (err) {
          return done("error al obtener usuario" + err);
        }
      }
    )
  );
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "username",
      },
      async (username, password, done) => {
        try {
          const user = await UserService.searchUser(username);
          if (!user)
            return done(null, false, { message: "Usuario no encontrado" });
          if (!isValidPassword(user, password))
            return done(null, false, { message: "Contraseña incorrecta" });
          return done(null, user);
        } catch (err) {
          return done("error al obtener usuario" + err);
        }
      }
    )
  );

  //registro con github

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await UserService.searchUser(profile._json.email);
          if (!user) {
            const newUser = {
              first_name: profile._json.name ? profile._json.name : "",
              last_name: "",
              age: 0,
              email: profile._json.email,
              password: "",
            };
            const response = await UserService.createUser(newUser);
            return done(null, response);
          } else {
            return done(null, user);
          }
        } catch (err) {
          return done("error al obtener usuario" + err);
        }
      }
    )
  );
};

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserService.searchUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = initializePassport;
