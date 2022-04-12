require('dotenv').config({path: "./.env"});
const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 4000;

const User = require("./models/model").User;
const userRoutes = require("./routes/user-routes");
const todoRoutes = require("./routes/todo-routes");

require("./authentication/auth");
require("./database/connection");

app.use(express.json());
app.use(session({
  secret: "The secret string for cookie level",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

// app.use(cors({
  // origin: "https://todo-list-reactapp.herokuapp.com/"
// }));

app.use("/users", userRoutes);
app.use("/todo", todoRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", function(req, res) {
      res.sendFile(path.resolve(__dirname,"client","build","index.html"));  
  });
}

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
