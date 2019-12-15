const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

function SimpleValidationError(message, noUsername=false) {
  this.message = message,
  this.name = 'ValidationError'
  this.noUsername = noUsername
}

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1})
  res.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body

    if (!body.password) {
      throw new SimpleValidationError('Path `password` is required.')
    }

    if (body.password.length < 3) {
      throw new SimpleValidationError(`User validation failed: username: Path \`password\` (\`${body.password}\`) is shorter than the minimum allowed length (3).`)
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
      // blogs: []
    })

    const savedUser = await user.save()

    // if (!savedUser) {
    //   throw new SimpleValidationError('Path `username` is required.', noUsername=true)
    // }

    res.json(savedUser)
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/:id', async (req, res) => {
  try {
    const users = await User.findById(req.params.id)
    res.json(users.toJSON())
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter