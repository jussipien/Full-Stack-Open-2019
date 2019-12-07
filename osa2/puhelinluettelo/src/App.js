import React, { useState } from 'react'

const PersonList = ({persons}) => {
  const listItems = () =>
    persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)
  return (
    listItems()
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const inputName = (event) => {
    setNewName(event.target.value)
  }

  const inputNumber = (event) => {

  }

  const onSubmit = (event) => {
    event.preventDefault()
    console.log(persons)
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook!`)
    } else {
      const personObject= {
        name: newName,
      }
      setPersons(persons.concat(personObject))
    }
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">name</label>
          <input type="text" name="name" onChange={inputName} value={newName}/>
        </div>
        <div>
          <label htmlFor="number">number</label>
          <input type="text" name="number"onChange={inputNumber} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul style={{listStyle:'none'}}>
        <PersonList persons={persons}/>
      </ul>
    </div>
  )

}

export default App