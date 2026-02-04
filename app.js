const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const mongoURI = `mongodb://localhost:27017/todo-demo`;

mongoose.connect(mongoURI)
    .then(() => { 
        console.log("mongoose connected") 
    })
    .catch((err) => {
        console.log("DB connection failed", err);
    });

app.listen(5000, () => {
    console.log("server on 5000");
});
