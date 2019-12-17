const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
  res.json(blogs)
})
  
blogsRouter.post('/', async (req, res) => {
  try {
    let body = req.body

    if (!req.token) {
      return res.status(401).json({error: 'token missing or invalid'})
    }

    const decodedToken = jwt.verify(req.token, config.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({error: 'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)
    body.user = user._id
    
    // const users = await User.find({})
    // const randomIndex = Math.floor(Math.random()*users.length)
    // let user = users[randomIndex]
    // console.log(user)
    
    let blog = new Blog(body)
    // console.log(blog)

    if (!blog.title || !blog.url) {
      res.status(400).end()
    }

    if (!blog.likes) {
      blog.likes = 0
    }
  
    const savedBlog = await blog.save()

    delete user._id
    // console.log(user)
    let blogs = user.blogs.concat(savedBlog._id)
    user.blogs = blogs
    // await User.findByIdAndUpdate(user._id, user)
    await user.save()
    // console.log(user)
    return res.status(201).json(savedBlog)
  } catch { (error) => 
    next(error)
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  try {
    if (!req.token) {
      return res.status(401).json({error: 'token missing or invalid'})
    }

    const id = req.params.id

    const decodedToken = jwt.verify(req.token, config.SECRET)
    // console.log(decodedToken)
    if (!decodedToken.id) {
      return res.status(401).json({error: 'token missing or invalid'})
    }
    const blog = await Blog.findById(id)
    // console.log(blog.user.toString())
    // console.log(decodedToken.id.toString())
    if (blog.user.toString() !== decodedToken.id.toString()) {
      return res.status(401).json({error: 'only the user that added the blog can delete it'})
    } 
    await blog.delete()
    // await Blog.findByIdAndDelete(id)
    res.status(204).end()
  } catch { (error) => 
    next(error)
    // res.status(404).json({'error': 'no blog found with given id'})
  }
})

blogsRouter.put('/:id', async (req, res) => {
  try {
    if (!req.token) {
      return res.status(401).json({error: 'token missing or invalid'})
    }

  const id = req.params.id
  const body = req.body

  if (!body.title || !body.url) {
    res.status(400).end()
  }

    const decodedToken = jwt.verify(req.token, config.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({error: 'token missing or invalid'})
    }

    const blog = await Blog.findById(id)

    if (blog.user.toString() !== decodedToken.id.toString()) {
      return res.status(401).json({error: 'only the user that added the blog can update it'})
    } 
    
    const updated = await Blog.findByIdAndUpdate(id, body, {new: true} )

    return res.status(200).json(updated.toJSON())
  } catch { (error) =>
    next(error)
      // res.status(404).json({'error': 'no blog found with given id'})
  }
})

module.exports = blogsRouter