import anecdoteService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const handleVote = anecdoteObject => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.addVote(anecdoteObject.id, anecdoteObject)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    }) 
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  let stateCopy
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'CREATE':
      const newAnecdote = action.data
      console.log({newAnecdote})
      stateCopy = [...state, newAnecdote]
      return stateCopy
    case 'VOTE':
      const index = state.findIndex(object => object.id === action.data.id)
      console.log(index)
      if (index !== -1) {
        stateCopy = [...state]
        stateCopy[index] = action.data
        return stateCopy
      }
      return state
    default: return state
  }
}

export default anecdoteReducer