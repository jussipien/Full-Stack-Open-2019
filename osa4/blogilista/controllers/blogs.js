const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1} )
  res.json(blogs)
})
  
blogsRouter.post('/', async (req, res) => {
  try {
    const users = await User.find({})
    const randomIndex = Math.floor(Math.random()*users.length)
    let user = users[randomIndex]
    // console.log(user)
    req.body.user = user._id
    let blog = new Blog(req.body)
    // console.log(blog)

    if (!blog.title || !blog.url) {
      res.status(400).end()
    }

    if (!blog.likes) {
      blog.likes = 0
    }
  
    const savedBlog = await blog.save()
    delete user._id
    console.log(user)
    let blogs = user.blogs.concat(savedBlog._id)
    user.blogs = blogs
    console.log(user)
    await User.findByIdAndUpdate(user._id, user)
    res.status(201).json(savedBlog)
  } catch { (error) => 
    next(error)
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  try {
    await Blog.findByIdAndDelete(id)
    res.status(204).end()
  } catch { (error) => 
    next(error)
    // res.status(404).json({'error': 'no blog found with given id'})
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const body = req.body

  if (!body.title || !body.url) {
    res.status(400).end()
  }

  try {
    const updated = await Blog.findByIdAndUpdate(id, body, { new: true } )
    res.status(200).json(updated.toJSON())
  } catch { (error) =>
    next(error)
      // res.status(404).json({'error': 'no blog found with given id'})
  }
})

module.exports = blogsRouter