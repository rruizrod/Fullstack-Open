const personsRouter = require("express").Router();
const Person = require("../models/person");

personsRouter.get("/", (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()));
  });
});

personsRouter.post("/", (request, response, next) => {
  const body = request.body;
  const newPerson = new Person({
    name: body.name,
    number: body.number
  });

  newPerson
    .save()
    .then(savedPerson => {
      response.json(savedPerson.toJSON());
    })
    .catch(error => next(error));
});

personsRouter.get("/:id", (request, response, next) => {
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

personsRouter.put("/:id", (request, response, next) => {
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

personsRouter.delete("/:id", (request, response, next) => {
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

module.exports = personsRouter;
