import React from 'react'
import {handleVote} from '../reducers/anecdoteReducer'
import {changeMessage, clearMessage} from '../reducers/notificationReducer'

const AnecdoteForm = ({store}) => {

  const state = store.getState()
  const filter = state.filter
  const anecdotes = state.anecdotes
  console.log({filter})

  const anecdotesToShow = () => {
    return !!filter
      ? anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
      : anecdotes
  } 

  const vote = (id, content) => {
    store.dispatch(handleVote(id))
    store.dispatch(changeMessage(`you voted '${content}'`))
    setTimeout(() => {
      store.dispatch(clearMessage())
    }, 5000)
  }

  return (
    <>
    {anecdotesToShow().sort((a, b) => {return b.votes - a.votes}).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
        </div>
      </div>
    )}
    </>
  )
}

export default AnecdoteForm