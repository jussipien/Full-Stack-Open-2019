import React, { useState, useEffect  } from 'react'
import axios from 'axios'

const Filter = ({inputFilter, newFilter}) => {
  return (
  <>
    <label htmlFor="filter">filter shown with</label>
    <input type="text" id="filter" name="filter" onChange={inputFilter} value={newFilter}/>
  </>
  )
}

const PersonForm = ({inputName, newName, inputNumber, newNumber, onSubmit}) => {
  return (
    <>
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">name</label>
        <input type="text" id="name" name="name" required={true} onChange={inputName} value={newName}/>
      </div>
      <div>
        <label htmlFor="number">number</label>
        <input type="text" id="number" name="number" required={true} onChange={inputNumber} value={newNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    </>
  )
}

const PersonTable = ({persons}) => {
  const personsToShow = persons.filter(person => person.display === true)
  const tableItems = () =>
    personsToShow.map(person => <tr key={person.name}><td>{person.name}</td><td>{person.number}</td></tr>)
  return (
    <table>
      <tbody>
        {tableItems()}
      </tbody>
    </table>
  )
}

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456', display: true },
  //   { name: 'Ada Lovelace', number: '39-44-5323523', display: true },
  //   { name: 'Dan Abramov', number: '12-43-234345', display: true },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122', display: true }
  // ])

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const inputFilter = (event) => {
    const string = event.target.value
    setNewFilter(string)
    let personsCopy = [...persons]
    if (!!string) {
      console.log('string exists')
      personsCopy.forEach(person => person.display = person.name.toLowerCase().includes(string.toLowerCase()))
    } else {
      console.log('no string')
      personsCopy.forEach(person => person.display = true)
    }
    console.log('personsCopy', personsCopy)
    return setPersons(personsCopy)
  }

  const inputName = (event) => setNewName(event.target.value)

  const inputNumber = (event) => setNewNumber(event.target.value)

  const onSubmit = (event) => {
    return handleSubmit(event)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(persons)
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook!`)
    } else {
      const personObject= {
        name: newName,
        number: newNumber,
        display: undefined
      }
      if (!!newFilter) {
        personObject.display = personObject.name.toLowerCase().includes(newFilter.toLowerCase())
      } else {
        personObject.display = true
      }
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
    // setNewFilter('')
  }

  return (
    <div>
      <div>
        <h1>Phonebook</h1>
        <Filter inputFilter={inputFilter} newFilter={newFilter}/>
      </div>
      <div>
        <h2>add a new</h2>
        <PersonForm inputName={inputName} newName={newName} inputNumber={inputNumber} newNumber={newNumber} onSubmit={onSubmit}/>
      </div>
      <div>
        <h2>Numbers</h2>
        <PersonTable persons={persons}/>
      </div>
    </div>
  )

}

export default App