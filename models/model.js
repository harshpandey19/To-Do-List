const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const itemSchema = new mongoose.Schema({
    data: String
});

const Item = new mongoose.model("Item", itemSchema);

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    // googleId: String,
    items: [itemSchema]
});
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);



module.exports = {Item, User};