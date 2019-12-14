const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})
  
blogsRouter.post('/', (request, response) => {
  let blog = new Blog(request.body)

  if (!blog.title || !blog.url) {
    response.status(400).end()
  }

  if (!blog.likes) {
    blog.likes = 0
  }

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  await Blog
    .findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      response.status(404).json({'error': 'no blog matching id found'})
    })
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body

  if (!body.title || !body.url) {
    response.status(400).end()
  }

  await Blog
    .findByIdAndUpdate(id, body , { new: true } )
    .then(result => {
      response.status(200).json(result.toJSON())
    })
    .catch(error => {
      console.log(error)
      response.status(404).json({'error': 'no blog matching id found'})
    })
})

module.exports = blogsRouter