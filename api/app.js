const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Authentication libraries
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// Initiate our application
const app = express();

// Models
const User = require("./models/User");

// Routes
const userRoutes = require("./routes/userRoutes");
const loginRoute = require("./routes/loginRoute");
const cryptoRoutes = require("./routes/cryptoRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const newsRoutes = require("./routes/newsRoutes");

// Enable all origins to connect to our app
app.use(cors());

// Global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Set up
const mongoDB = process.env.MONGO_DB;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

// Set up local strategy for our authentication (passport.authentication() uses these settings)
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      // Error occurred in our search
      if (err) return done(err);

      // Validates username
      if (!user) {
        return done(null, false);
      }

      // Validates password
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) return done(err);

        if (res) {
          // Password authenticated
          return done(null, user);
        } else {
          // passwords do not match
          return done(null, false);
        }
      });
    });
  })
);

app.use("/user", userRoutes);
app.use("/transactions", transactionRoutes);
app.use("/cryptos", cryptoRoutes);
app.use("/login", loginRoute);
app.use("/news", newsRoutes);

app.get("/", (req, res, next) => {
  res.json({
    msg: "welcome to my crypto API - designed for specific application needs",
  });
});

module.exports = app;
