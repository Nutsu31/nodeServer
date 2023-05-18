const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("./db/connect");
const router = require("./routes/router");
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

const port = 4000;
app.listen(port, console.log(`Server Started on port : ${port}`));
