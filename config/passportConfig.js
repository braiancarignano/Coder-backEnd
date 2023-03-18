const passport = require("passport");
const local = require("passport-local");
const modelUser = require("../models/users.js");
const { isValidPassword, createHash } = require("../utils.js");
const GithubStrategy = require("passport-github2");

const LocalStrategy = local.Strategy;

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
          const user = await modelUser.findOne({ email: username });
          if (user)
            return done(null, false, { message: "El usuario ya existe" });
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };
          const response = await modelUser.create(newUser);
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
          const user = await modelUser.findOne({ email: username });
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

  const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
  const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

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
          const user = await modelUser.findOne({
            email: profile._json.email,
          });
          if (!user) {
            const newUser = {
              first_name: profile._json.name ? profile._json.name : "",
              last_name: "",
              age: 0,
              email: profile._json.email,
              password: "",
            };
            const response = await modelUser.create(newUser);
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
    const user = await modelUser.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = initializePassport;
