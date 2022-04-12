require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
require("../authentication/auth");
require("../database/connection");
const User = require("../models/model").User;
const Item = require("../models/model").Item;
const app = express();

const addItem = (req, res, next) => {
    if(!(req.body.task)){
        return res.json("Todo item can't be blank");
    }
    try{
        if(req.user === null) {
            return res.json("You Are Not Authenticated");
        }    
        else{    
            const item = new Item({
                data: req.body.task
            });
            User.findById(req.user.id, function(err, foundUser){
                if(err){
                    console.log(err);
                }
                else{
                    if(foundUser){
                        foundUser.items.push(item);
                        foundUser.save(function(){
                            console.log("Added item");
                            // console.log(foundUser.items);
                            res.json(foundUser.items);
                        })
                    }
                }
            })
        }
    }
    catch(err){
        res.json(next(err));
    }
}

const updateItem = (req, res, next) => {
    if(!(req.body.task)){
        return res.json("Todo item can't be blank");
    }
    try{    
        if(req.user === null) {
            return res.json("You Are Not Authenticated");
        } 
        else{    
            // from mongoDB documentation on update documents in array
            User.updateOne({_id: req.user._id, "items._id": req.body.id}, 
                           {$set: {"items.$.data": req.body.task}}, function(err){
                if(!err){
                    User.findById(req.user.id, function(err, foundUser){
                        foundUser.save(function(){
                            console.log("deleted item");
                            // console.log(foundUser.items);
                            res.json(foundUser.items);
                        })
                    })
                }
            })
        }
    }
    catch(err){
        res.json(next(err));
    }
}

const deleteItem = (req, res, next) => {
    try{    
        if(req.user === null) {
            return res.json("You Are Not Authenticated");
        } 
        else{    
            User.updateOne({_id: req.user._id}, {$pull: {items: {_id: req.body.id}}}, function(err){
                if(!err){
                    User.findById(req.user.id, function(err, foundUser){
                        foundUser.save(function(){
                            console.log("deleted item");
                            // console.log(foundUser.items);
                            res.json(foundUser.items);
                        })
                    })
                }
            })
        }
    }
    catch(err){
        res.json(next(err));
    }
}

module.exports = { addItem, deleteItem, updateItem }