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

const post = async (object) => {
  const res = await axios.post(baseUrl, asObject(object))
  return res.data
}

export default {getAll, post}