const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const PORT = 3001;

let persons = [
  {
    name: "Arto",
    number: "123456",
    id: 5
  }
];
const generateID = () => {
  return Math.random(500000);
};

morgan.token("data", function(req, res) {
  const data = req.body;
  console.log(data);
  if (!data.name) {
    return;
  }
  return JSON.stringify(data);
});
app.use(bodyParser.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

app.get("/info", (request, response) => {
  const num = `Phonebook has info for ${persons.length} people.`;
  const time = `${Date()}`;

  response.send(`<p>${num}</p><p>${time}</p>`);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const exists = persons.find(person => person.name === body.name);

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number missing"
    });
  } else if (exists) {
    return response.status(400).json({
      error: "Name already exists"
    });
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateID()
  };

  persons = persons.concat(newPerson);

  response.json(newPerson);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(note => note.id !== id);

  response.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
