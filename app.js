const express = require('express')
var cors = require('cors')
const app = express()
require("./dataBase")
const router = require("./maq-api/route")
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors())
app.use("/", router);

module.exports = app