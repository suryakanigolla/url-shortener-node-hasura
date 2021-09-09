const express = require("express");
const bodyParser =  require("body-parser");
const cors = require("cors")
const path = require("path")

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.resolve(__dirname, "./client/dist")));


module.exports = app