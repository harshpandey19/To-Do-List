require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
require("../authentication/auth");
require("../database/connection");
const User = require("../models/model").User;
const app = express();

const isAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        // console.log("user is authenticated successfully");
    }
    else{
        req.user = null;
    }
    next();
}

module.exports = { isAuth }