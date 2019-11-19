const config = require("./utils/config");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors"); //DEL LATER
const personRouter = require("./controllers/persons");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");

console.log("Connecting to", config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });

//MIDDLEWARE DEFINITIONS
app.use(cors());
app.use(express.static("build"));
app.use(bodyParser.json());

app.use("/api/persons", personRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.get("/info", (request, response, next) => {
  Person.countDocuments({}, function(error, result) {
    if (error) {
      next(error);
    } else {
      const num = `Phonebook has info for ${result} people.`;
      const time = `${Date()}`;

      response.send(`<p>${num}</p><p>${time}</p>`);
    }
  });
});

module.exports = app;
