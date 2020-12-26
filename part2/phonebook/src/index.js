import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css'

import phoneService from './services/phone';

const Form = (props) => {

  return (
    <>
    <form onSubmit={props.handleSubmit}>
      <div>name: <input value={props.newName} onChange={props.handleName}/></div>
      <div>number: <input value={props.newNumber} onChange={props.handleNumber}/></div>
      <div><button type="submit">Add</button></div>
    </form>
    </>
  )
}

const Filter = (props) => {
  return(
    <div>Search: <input value={props.search} onChange={props.handleSearch}/></div>
  )
}

const Persons = (props) => {
  return (
    <div>
      {props.persons
        .filter(props.search)
          .map(person => {
            return (
              <div key={person.id}>
                <p>{person.name} {person.number}</p>
                <button onClick={() => props.handleDelete(person.id)}>delete</button>
              </div>
            )
            }
          )
        }
    </div>
  )
}

const Notification = (props) => {
  return (
    <div style={props.style}>
      {props.message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setNewSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [style, setNewStyle] = useState()

  const fetch = () => {
    phoneService
      .getAll()
      .then(result => setPersons(result))
  }

  useEffect(fetch, [])

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const alreadyRemoved = (id) => {
    setErrorMessage(
      `Informations about '${persons.filter(person => person.id !== id).name}' was already removed from server`
    )
    setNewStyle(errorStyle)
    setTimeout(() => {
      setErrorMessage(null)
      setNewStyle(null)
    }, 5000)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const searchFun = (person) => {
    return person.name.includes(search)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if(persons.filter(person => person.name === newName).length > 0){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const oldPerson = persons.find(n => n.name === newName)
        const changedPerson = {...oldPerson, number: newPhone}

        phoneService
          .update(oldPerson.id, changedPerson)
          .then(result => {
            setPersons(persons.map(person => person.id !== result.id ? person : result))

            setErrorMessage(`Number for ${oldPerson.name} updated.`)
            setNewStyle(successStyle)
            setTimeout(() => {
              setErrorMessage(null)
      
              setNewStyle(null)
            }, 5000)
          })
          .catch(error => {
            alreadyRemoved(oldPerson.id)
            setPersons(persons.filter(person => person.id !== oldPerson.id))
          })
      }
    }else{
      const newPerson = { name: newName, number: newPhone}
      
      phoneService
        .add(newPerson)
        .then(result => setPersons(persons.concat(result)))

        setErrorMessage(`${newPerson.name} added to phonebook.`)
        setNewStyle(successStyle)
        setTimeout(() => {
          setErrorMessage(null)
          setNewStyle(null)
        }, 5000)
    }

    setNewPhone('')
    setNewName('')
  }

  const removePerson = (id) => {
    const str = `Delete ${persons.find(n => n.id === id).name} ?`
    if(window.confirm(str)){
      phoneService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alreadyRemoved(id)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return(
    <div>
      <h1>Phonebook</h1>
      <Notification style={style} message={errorMessage}/>
      <Filter search={search} handleSearch={handleSearch}/>
      <h3>Add New Contact</h3>
      <Form newName={newName} handleSubmit={addPerson} handleName={handleNameChange} newNumber={newPhone} handleNumber={handlePhoneChange}/>
      <h2>Numbers</h2>
      <Persons search={searchFun} persons={persons} handleDelete={removePerson}/>
    </div>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);