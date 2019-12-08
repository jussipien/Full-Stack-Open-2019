import React, { useState, useEffect  } from 'react'
import Services from './services/services'
import './App.css'

const messageTimeout = 5000

const Message = ({text, type}) => {
  if (!!text) {
    const classes = `Message ${type}`
    return (
    <div className={classes}>
      <p>{text}</p>
    </div>
    )
  } else {
    return <></>
  }
}

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

const PersonTable = ({persons, onClickDelete}) => {
  const personsToShow = persons.filter(person => person.display === true)
  const tableItems = () =>
    personsToShow.map(person => <tr key={person.name + "-" + person.id}><td>{person.name}</td><td>{person.number}</td><td><button onClick={onClickDelete} data-id={person.id}>delete</button></td></tr>)
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
  const [ messageText, setMessageText ] = useState('')
  const [ messageType, setMessageType ] = useState('')

  useEffect(() => {
    // axios
    //   .get('http://localhost:3001/persons')
      Services.getAll()
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

  const onClickDelete = (event) => {
    const id = event.target.getAttribute('data-id')
    console.log(id)
    const personToDelete = persons.find(person => person.id.toString() === id)
    console.log(personToDelete)
    if(window.confirm(`Delete ${personToDelete.name}?`)) {
      const personsCopy = persons.filter(person => person.id.toString() !== id)
      console.log(`removing record with id ${id}`)
      Services.remove(id)
      .then(displayError(`Removed ${newName} from phonebook`, 'success', messageTimeout))
      return setPersons(personsCopy)
    }
  }

  const displayError = (text, type, timeout) => {
      setMessageText(text)
      setMessageType(type)
      setTimeout(() => {
      setMessageText('')
      }, timeout)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(persons)
    const index = persons.findIndex(person => person.name === newName)
    if (index !== -1) {
      // alert(`${newName} is already added to phonebook!`)
      if (window.confirm(`${newName} is already added to phonebook, replate the old number with a new one?`)) {
        let personsCopy = [...persons]
        personsCopy[index].number = newNumber
        setPersons(personsCopy)
        const updated = personsCopy[index]
        try {
          Services.update(updated.id, updated)
          .then(response => {
            displayError(`Number of ${newName} changed`, 'success', messageTimeout)
            console.log(response)
          })
        } catch (error) {
          console.log(error)
          displayError(`${newName} was already removed from server`, 'error', messageTimeout)
        }
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        display: true
      }

      if (!!newFilter) {
        personObject.display = personObject.name.toLowerCase().includes(newFilter.toLowerCase())
      }

      setPersons(persons.concat(personObject))
      Services.create(personObject)
      .then(response => {
        displayError(`${newName} added to phonebook`, 'success', messageTimeout)
        console.log(response)
      })
    }
    setNewName('')
    setNewNumber('')
    // setNewFilter('')
  }

  return (
    <div>
      <div>
        <Message text="TEST ERROR" type="error"/>
        <h1>Phonebook</h1>
        <Message text={messageText} type={messageType}/>
        <Filter inputFilter={inputFilter} newFilter={newFilter}/>
      </div>
      <div>
        <h2>add a new</h2>
        <PersonForm inputName={inputName} newName={newName} inputNumber={inputNumber} newNumber={newNumber} onSubmit={onSubmit}/>
      </div>
      <div>
        <h2>Numbers</h2>
        <PersonTable persons={persons} onClickDelete={onClickDelete}/>
        <Message text="TEST SUCCESS" type="success"/>
      </div>
    </div>
  )

}

export default App