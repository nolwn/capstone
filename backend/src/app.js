const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

// TEST
const moves = require("./controllers/moves");

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/chess", moves.getGame);

app.listen(port, () => console.log("Howdy from port ", port));
