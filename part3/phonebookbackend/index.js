require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan"); //DEL LATER
const cors = require("cors"); //DEL LATER
const Person = require("./models/person");

//MORGAN TOKEN TO DISPLAY DATA PASSED TO PUSH OPERATION
morgan.token("data", function(req, res) {
  const data = req.body;
  console.log(data);
  if (!data.name) {
    return "-";
  }
  return JSON.stringify(data);
});

//MIDDLEWARE DEFINITIONS
app.use(express.static("build"));
app.use(bodyParser.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);
app.use(cors());

//ERROR HANDLER FOR INCORRECT ID
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

//REST OF SERVER CODE
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

app.get("/api/persons", (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()));
  });
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number missing"
    });
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number
  });

  newPerson.save().then(savedPerson => {
    response.json(savedPerson.toJSON());
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  const person = {
    number: body.number
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updated => {
      response.json(updated.toJSON());
    })
    .catch(error => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  Person.findByIdAndRemove(id)
    .then(result => {
      if (result) {
        response.status(204).end();
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
