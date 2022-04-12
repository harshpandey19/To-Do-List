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

const registerUser = (req, res, next) => {
    if(!(req.body.username) || !(req.body.password)){
        return res.json("Please enter valid credentials");
    }
    try{    
        // console.log(req.body);
        User.findOne({username: req.body.username}, function(err, foundUser){
            if(foundUser){
                return res.json("Username already exists");
            }
            else{
                User.register({username: req.body.username}, req.body.password, function(err, user){
                    if(err){
                      console.log(err);
                      return next(err);
                    }
                    else{
                      passport.authenticate("local")(req, res, function(){
                        console.log("registered user");
                        res.json("registered user");
                      })
                    }
                })
            }
        })
    }
    catch(err){
        res.json(next(err));
    }
}

const loginUser = (req, res, next) => {
    if(!(req.body.username) || !(req.body.password)){
        return res.json("Please enter valid credentials");
    }
    try{
        User.findOne({username: req.body.username}, function(err, foundUser){
            if(foundUser){
                const user = new User({
                    username: req.body.username,
                    password: req.body.password
                  })
                  req.login(user, function(err) {
                    if (err){
                      console.log(err);  
                      return next(err);
                    }
                    else{
                      passport.authenticate("local")(req, res, function(){
                        // console.log(req.user);
                        res.json("logged in user");
                      })
                    }
                });
            }
            else{
                return res.json("User not registered");
            }
        })
    }
    catch(err){
        res.json(next(err));
    }
}

const checkAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        res.json(req.user.items);
    }
    else{
        req.user = null;
        res.json("INVALID");
    }
}

const logoutUser = (req, res, next) => {
    try{
        req.logout();
        res.redirect("/");
    }
    catch(err){
        res.json(next(err));
    }
}



module.exports = { registerUser, loginUser, checkAuth, logoutUser }