// const blogsRouter = require('express').Router()
const express = require('express')
const app = express()

const blogArray = [
  {
    title: 'Things I Didn\'t know as of 2018',
    author: 'Dan Abramov'
  },
  {
    title: 'Microservices and The First Law of Distributed Objects',
    author: 'Martin Fowler'
  }
]

// blogsRouter.get('/', async (req, res) => {
//   const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
//   res.json(blogs)
// })

app.get('/api/blogs',(req, res) => {
  res.json(blogArray)
})

app.listen(3003, () => {
  console.log(`Server running on port 3003`)
})
// module.exports = blogsRouter