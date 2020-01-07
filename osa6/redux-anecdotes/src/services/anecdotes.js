import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const post = async (anecdote) => {
  console.log({anecdote})
  const object = asObject(anecdote)
  console.log({object})
  const res = await axios.post(baseUrl, object)
  console.log(res.data)
  return res.data
}

export default {getAll, post}