import React from 'react'
import {connect} from 'react-redux'
import {handleVote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = async (anecdote) => {
    props.handleVote(anecdote)
    props.setNotification(`you voted '${anecdote.content}'`, 5)
  }

  return (
    <>
    {props.anecdotesToShow.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes} votes
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </>
  )
}

const anecdotesToShow = ({anecdotes, filter}) => {
  let filteredAnecdotes = !!filter
    ? anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
    : anecdotes

  return filteredAnecdotes.sort((a, b) => {return b.votes - a.votes})
} 

const mapStateToProps = (state) => {
  console.log(state)
  return {
    anecdotesToShow: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  handleVote,
  setNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteList)

export default ConnectedAnecdoteList
