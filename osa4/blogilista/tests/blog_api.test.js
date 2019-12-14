const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

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
    .send({'title': 'test', 'author': 'test', 'url': 'test', 'likes': 10})
    .set('Accept', 'application/json')
    .expect(201)
    .expect('Content-Type', /json/)

    const resAfter = await api.get('/api/blogs')
    
    expect(resAfter.body.length).toBeGreaterThan(resBefore.body.length)
})

test('posting blog without likes property will fill it with 0', async () => {
  const res = await api
    .post('/api/blogs')
    .send({'title': 'test', 'author': 'test', 'url': 'test'})

    expect(res.body.likes).toBeLessThanOrEqual(0)
})

test('posting blog without title or url property will return status 400 ', async () => {
    await api
      .post('/api/blogs')
      .send({'title': 'test', 'author': 'test', 'likes': 10})
      .expect(400)

    await api
      .post('/api/blogs')
      .send({'author': 'test', 'url': 'test', 'likes': 10})
      .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})