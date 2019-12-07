import React, { useState } from 'react'

const PersonList = ({persons}) => {
  const listItems = () =>
    persons.map(person => <li key={person.name}>{person.name}</li>)
  return (
    listItems()
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const changeInput = (event) => {
    setNewName(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const personObject= {
      name: newName,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">name</label>
          <input type="text" name="name" onChange={changeInput} value={newName}/>
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