require("module-alias/register");

const express = require("express");
const router = require("./routes");
const { config } = require("dotenv");
const { env } = require("./library/functions");
const mongoose = require("mongoose");
const cors = require('cors')

config();

const app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded());

app.use(router);

app.use((error, req, res, next) => {
  res.status(error.status || 400).send({
    message: error.message || "Something went wrong!",
    validation: error.validation,
  });
});

app.listen(env("API_PORT"), async () => {
  console.log(`Started server at http://localhost:${env("API_PORT")}`);
  await mongoose.connect(env("MONGO_URL"));
  console.log("Mongodb connected");
});

//?
// middlewares function k ho
// 1.Application middleware
// 2.Router middleware
// 3.Build-in/First-party middleware
// 4.Third-party middleware
// 5.Error-handling middleware
