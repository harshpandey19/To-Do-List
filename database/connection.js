const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const DB = process.env.DATABASE;
mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}).then(() => {
    console.log("connection successful");
}).catch((err) => console.log(err));