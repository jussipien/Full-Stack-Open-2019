const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

// const initialBlogs = [
//   {
//     title: 'This is a test',
//     author: 'Test Poster',
//     url: 'tes.ti',
//     likes: 10
//   },
//   {
//     content: 'A quick brown fox jumps over the lazy dog',
//     author: 'The Boston Journal',
//     url: 'a.dog',
//     likes: 1885
//   },
// ]

// beforeEach(async () => {
//   await Blog.deleteMany({})
//   console.log('test database cleared')

//   initialBlogs.forEach(async (blog) => {
//     let blogObject = new Blog(blog)
//     await blogObject.save()
//   })
//   console.log('test database initialized')
// }) 

describe('tests for blog model', () => {

  let authString

  beforeAll(async () => {
    const blogTestUser = await User.findOne({username: 'blogtest'})

    if (!blogTestUser) {
      await api
      .post('/api/users')
      .send({'username': 'blogtest', 'name': 'blogtest', 'password': 'blogtest'})
    }

    const loginResult = await api
    .post('/api/login')
    .send({'username': 'blogtest', 'password': 'blogtest'})

    authString = `Bearer ${loginResult.body.token}`

  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('identification field of blogs is "id"', async () => {
    const res = await api.get('/api/blogs')

    expect(res.body[0].id).toBeDefined()
  })

  test('new blogs can be added by posting to "/api/blogs"', async () => {
    const resBefore = await api.get('/api/blogs')

    await api
      .post('/api/blogs')
      .set('Accept', 'application/json')
      .set('Authorization', authString)
      .send({'title': 'test', 'author': 'test', 'url': 'test', 'likes': 10})
      .expect(201)
      .expect('Content-Type', /json/)

    const resAfter = await api.get('/api/blogs')
    
    expect(resAfter.body.length).toBeGreaterThan(resBefore.body.length)
  })

  test('posting blog without likes property will fill it with 0', async () => {
    const res = await api
      .post('/api/blogs')
      .set('Authorization', authString)
      .send({'title': 'test', 'author': 'test', 'url': 'test'})

      expect(res.body.likes).toBe(0)
  })

  test('posting blog without title or url property will return status 400', async () => {
      const res1 = await api
        .post('/api/blogs')
        .set('Authorization', authString)
        .send({'title': 'test', 'author': 'test', 'likes': 10})
      expect(res1.status).toBe(400)

      const res2 = await api
        .post('/api/blogs')
        .set('Authorization', authString)
        .send({'author': 'test', 'url': 'test', 'likes': 10})
      expect(res2.status).toBe(400)
  })

})

describe('tests for user model', () => {

  test('posting non-valid user doesn\'t create record', async () => {
    const resBefore = await api.get('/api/users')

    await api
      .post('/api/users')
      .send({'name': 'test', 'password': 'test'})

    const resAfter = await api.get('/api/users')
    expect(resAfter.length).toBe(resBefore.length)

  })

  test('posting non-valid user has correct status code and error name', async () => {
    const resPost1 = await api
      .post('/api/users')
      .send({'name': 'test', 'password': 'test'})
    expect(resPost1.status).toBe(400)
    expect(resPost1.body.error.message).toBe('User validation failed: username: Path `username` is required.')

    const resPost2 = await api
      .post('/api/users')
      .send({'username': 't', 'name': 'test', 'password': 'test'})
    expect(resPost2.status).toBe(400)
    expect(resPost2.body.error.message).toBe('User validation failed: username: Path `username` (`t`) is shorter than the minimum allowed length (3).')

    const resPost3 = await api
      .post('/api/users')
      .send({'username': 'test', 'name': 'test', 'password': 't'})
    expect(resPost3.status).toBe(400)
    expect(resPost3.body.error.message).toBe('User validation failed: password: Path `password` (`t`) is shorter than the minimum allowed length (3).')
  })
  

})

afterAll(async done => {
  await mongoose.connection.close()
  done()
})