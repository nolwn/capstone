const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser);
app.use(cors());

app.listen(port, () => console.log("Howdy from port ", port));
