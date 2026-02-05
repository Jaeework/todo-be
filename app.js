const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
require("dotenv").config(); 

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const whitelist = [
    process.env.FRONTEND_URL_DEV,
    process.env.FRONTEND_URL_PROD,
].filter(Boolean);
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
}
app.use(cors(corsOptions));

app.use("/api", indexRouter);

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
