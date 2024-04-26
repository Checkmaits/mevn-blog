require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
app.use(cors()); // configure later...
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1/products", require("./routes/product.routes"));

app.get("/", function (_, res) {
  const version = require("../package.json").version;
  return res.status(200).json({ message: `Hello from MEVN Store v${version} 😊` });
});

app.use(function (req, res, next) {
  const error = new Error("Endpoint not found ❌");
  error.status = 404;
  return next(error);
});

app.use(function (error, req, res, next) {
  return res.status(error.status || 500).json({ error: error.message || "Internal server error 😨" });
});

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(function () {
    const port = process.env.PORT || 1234;
    app.listen(port, function () {
      console.log(`[Server]: Listening on port ${port}...`);
    });
  })
  .catch(function (error) {
    console.error(error);
  });
