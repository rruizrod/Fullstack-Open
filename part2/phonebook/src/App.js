import React, { useState, useEffect } from "react";
import personService from "./services/personsService";

const Notification = ({ notif }) => {
  if (notif === null) {
    return null;
  }

  return (
    <div className={notif.type}>
      <p>{notif.message}</p>
    </div>
  );
};

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
  const del = props.onDel;
  const personsFilter = persons.filter(person => {
    const p = person.name.toLowerCase();
    const s = search.toLowerCase();
    if (p.includes(s)) {
      return person.name;
    }

    return null;
  });
  const people = () =>
    personsFilter.map(person => (
      <p key={person.name}>
        {person.name} {person.number}
        <button
          onClick={() => {
            const val = window.confirm(
              `Are you sure you wish to delete ${person.name}`
            );
            if (val) {
              del(person);
            }
          }}
        >
          Delete
        </button>
      </p>
    ));
  return <div>{people()}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState({});

  useEffect(() => {
    personService.getAll().then(initialPeople => {
      setPersons(initialPeople);
    });
  }, []);

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleSearch = event => {
    setSearch(event.target.value);
  };

  const handleNameAdd = event => {
    event.preventDefault();
    const personOBJ = {
      name: newName,
      number: newNumber
    };
    let x = persons.map(person => person.name);
    x = x.indexOf(newName);
    if (x >= 0) {
      const y = window.confirm(
        newName +
          " is already added to your phonebook, would you like to update with new number?"
      );
      const id = persons[x].id;
      if (y) {
        personService.update(id, personOBJ).then(returnedPerson => {
          setPersons(
            persons.map(person => (person.id !== id ? person : returnedPerson))
          );
          const newNotification = {
            message: `Successfully updated ${returnedPerson.name}'s number!`,
            type: "success"
          };
          setNotification(newNotification);
        });
      }
    } else {
      console.log("Button Clicked", event.target);
      personService.add(personOBJ).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        const newNotification = {
          message: `Successfully added ${returnedPerson.name}' to your phonebook!`,
          type: "success"
        };
        setNotification(newNotification);
      });
    }
    setTimeout(() => setNotification({}), 5000);
    setNewName("");
    setNewNumber("");
  };

  const handleDelete = person => {
    personService
      .del(person.id)
      .then(returned => {
        setPersons(persons.filter(p => p.id !== person.id));
        const newNotif = {
          message: `${person.name} has been deleted from the server!`,
          type: "success"
        };
        setNotification(newNotif);
      })
      .catch(error => {
        const newNotif = {
          message: `${person.name} has already been deleted from the server!`,
          type: "error"
        };
        setNotification(newNotif);
      });

    setTimeout(() => setNotification({}), 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notif={notification} />
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
      <Persons pe={persons} se={search} onDel={handleDelete} />
    </div>
  );
};

export default App;
