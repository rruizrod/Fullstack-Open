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
app.use(bodyParser.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);
app.use(cors());
app.use(express.static("build"));

//REST OF SERVER CODE
app.get("/info", (request, response) => {
  const num = `Phonebook has info for ${persons.length} people.`;
  const time = `${Date()}`;

  response.send(`<p>${num}</p><p>${time}</p>`);
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()));
  });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number missing"
    });
  }

  newPerson.save().then(savedPerson => {
    response.json(savedPerson.toJSON());
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);

  Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch(error => {
      console.log(error);
      response.status(400).send({ error: "Malformatted ID" });
    });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(note => note.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
