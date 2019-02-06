const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

const authRoutes = require("./routes/auth");
const gameRoutes = require("./routes/games");

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/games", gameRoutes);

/********************
 *  ERROR HANDLING  *
 ********************/

 app.use((req, res, next) => {
   const error = {};

   error.status = 404;
   error.message = "Not Found.";

   next(error);
 });

app.use((err, req, res, next) => {
  const error = {};

  error.status = err.status || 400;
  error.message = err.message || "Bad Request";
  error.stack = err.stack;

  res.status(error.status).send(error);
});

app.listen(port, () => console.log("Howdy from port ", port));
