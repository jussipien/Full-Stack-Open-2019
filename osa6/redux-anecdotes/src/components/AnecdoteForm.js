import React from 'react'
import {connect} from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.text.value
    event.target.text.value = ''
    console.log({content})
    props.createAnecdote(content)
    props.setNotification(`you added anecdote '${content}'`, 5)
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
  setNotification
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteForm)

export default ConnectedAnecdoteForm
