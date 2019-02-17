const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

const port = process.env.PORT || 3000;
const app = express();

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const authRoutes = require("./routes/auth");
const gameRoutes = require("./routes/games");
const userRoutes = require("./routes/users");

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/auth", authRoutes);
app.use("/games", gameRoutes);
app.use("/users", userRoutes);

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
