import React, { useState } from "react";

const Filter = props => {
  return (
    <div>
      Filter by <input value={props.send} onChange={props.onChange} />
    </div>
  );
};

const PersonForm = props => {
  const name = props.name;
  const number = props.number;
  const nameChange = props.onNameChange;
  const numberChange = props.onNumberChange;
  const click = props.onClick;

  return (
    <form>
      <div>
        name: <input value={name} onChange={nameChange} />
      </div>
      <div>
        number: <input value={number} onChange={numberChange} />
      </div>
      <div>
        <button type="submit" onClick={click}>
          add
        </button>
      </div>
    </form>
  );
};

const Persons = props => {
  const persons = props.pe;
  const search = props.se;
  const personsFilter = persons.filter(person => {
    const p = person.name.toLowerCase();
    const s = search.toLowerCase();
    if (p.includes(s)) {
      return person.name;
    }
  });
  const people = () =>
    personsFilter.map(person => (
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    ));
  return <div>{people()}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const handleNameChange = event => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearch = event => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };

  const handleNameAdd = event => {
    event.preventDefault();
    let x = persons.map(person => person.name);
    x = x.indexOf(newName);
    if (x >= 0) {
      window.alert(newName + " is already added to your phonebook");
    } else {
      console.log("Button Clicked", event.target);
      const personOBJ = {
        name: newName,
        number: newNumber
      };
      setPersons(persons.concat(personOBJ));
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter send={search} onChange={handleSearch} />
      <h3>Add A New Contact</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onClick={handleNameAdd}
      />
      <h3>Numbers</h3>
      <Persons pe={persons} se={search} />
    </div>
  );
};

export default App;
