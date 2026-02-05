const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
require("dotenv").config(); 

const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
const FRONTEND_URL_DEV = process.env.FRONTEND_URL_DEV;
const FRONTEND_URL_PROD = process.env.FRONTEND_URL_PROD;

const app = express();

const whitelist = [
    FRONTEND_URL_DEV,
    FRONTEND_URL_PROD,
].filter(Boolean);
const corsOptions = {
    origin: function (origin, callback) {
        console.log("Origin: ", origin);
        console.log('Whitelist:', whitelist);
        if (whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
}
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", indexRouter);

const mongoURI = MONGODB_URI_PROD;

mongoose.connect(mongoURI)
    .then(() => { 
        console.log("mongoose connected") 
    })
    .catch((err) => {
        console.log("DB connection failed", err);
    });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server on ${PORT}`);
});
