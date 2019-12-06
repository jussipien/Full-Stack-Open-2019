import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <><h1>{text}</h1></>

const Button = ({onClick, text}) => <><button onClick={onClick}>{text}</button></>

const VoteCounter = ({counter}) => <><p>has <b>{counter}</b> votes</p></>

// displays most voted anectode if any anoctode has voted, else displays nothing
const AnectodeWithMostVotes = ({anecdotes, votes, mostVoted}) => {
  console.log(votes, mostVoted)
  if (mostVoted === -1) {
    return (
      <></>
    )
  } else {
    return (
      <section>
        <Header text="Anecdote with most votes"/>
        <p>{anecdotes[mostVoted]}</p>
        <VoteCounter counter={votes[mostVoted]}/>
      </section>
    )
  }
  
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(6).fill(0))

  // state with index of most voted, initialized as -1 to indicate a state where nothing is voted yet
  const [mostVoted, setMostVoted] = useState(-1)

  // selects random index and sets it as state of selected
  const randomAnecdote = () => {
    const index = Math.floor(Math.random() * props.anecdotes.length)
    return setSelected(index)
  }

  // adds a vote to the selected anecdote and updates the most voted anecdote
  const setVoteStates = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)

    let max = copy[0]
    let maxIndex = 0

    for (let i = 0; i < copy.length; i++) {
      if (copy[i] > max) {
        maxIndex = i
        max = copy[i]
      }
    }
    setMostVoted(maxIndex)
  }

  const handleVoteStates = () => setVoteStates()
  
  return (
    <div>
      <section>
        <div>
          {/* this div could be a component */}
          <Header text="Anecdote of the day"/>
          <p>{props.anecdotes[selected]}</p>
          <VoteCounter counter={votes[selected]}/>
        </div>
        <div>
          <Button onClick={handleVoteStates} text="vote"/>
          <Button onClick={randomAnecdote} text="next anecdote"/>
        </div>
      </section>
      <AnectodeWithMostVotes anecdotes={props.anecdotes} votes={votes} mostVoted={mostVoted}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)