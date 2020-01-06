import React from 'react'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {changeMessage, clearMessage} from '../reducers/notificationReducer'

const AnecdoteForm = ({store}) => {

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.text.value
    store.dispatch(createAnecdote(content))
    event.target.text.value = ''
    store.dispatch(changeMessage(`you added anecdote '${content}'`))
    setTimeout(() => {
      store.dispatch(clearMessage())
    }, 5000)
  }

  return (
    <>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
        <div><input name="text"/></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm