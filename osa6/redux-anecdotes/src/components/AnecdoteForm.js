import React from 'react'
import {connect} from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {changeMessage, clearMessage} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.text.value
    event.target.text.value = ''
    console.log({content})
    const newAnecdote = await anecdoteService.post(content)
    props.createAnecdote(newAnecdote)
    props.changeMessage(`you added anecdote '${content}'`)
    setTimeout(() => {
      props.clearMessage()
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

const mapStateToProps = (state) => {
  console.log(state)
  return {
    anecdotes: state.anecdotes
  }
}

const mapDispatchToProps = {
  createAnecdote,
  changeMessage,
  clearMessage
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteForm)

export default ConnectedAnecdoteForm
