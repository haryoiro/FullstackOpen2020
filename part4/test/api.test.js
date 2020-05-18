const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)

const Blog = require('../model/blog')

const {
  listWithManyBlogs,
  mostLikedBlog,
  mostAuthor,
  mostLikedAuthor,
  blogsInDb,
} = require('./testHelper')

beforeAll(async () => {
  await Blog.deleteMany({})

  /* eslint-disable no-await-in-loop */
  for (const blog of listWithManyBlogs) {
    const noteObject = new Blog(blog)
    await noteObject.save()
  }
  /* eslint-enable no-await-in-loop */
})


test('JSON形式のデータを返す', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(listWithManyBlogs.length)
})

test('一意キーが`id`となっているかどうか', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('DBの中のリストとテストデータの最初のIDが一致する', async () => {
  const blogsAtStart = await blogsInDb()
  const blogToView = blogsAtStart[0]
  // console.log(blogsAtStart[0].id)

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(resultBlog.body).toEqual(blogToView)
})

test('ブログの中に特定のタイトルが含まれている', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map((r) => r.title)

  expect(titles).toContain('React patterns')
})

test('新しいblog評価を追加する', async () => {
  const newBlog = {
    title: 'Hello World by Haryo',
    author: 'Haryoiro',
    url: 'www.example.com',
    likes: 1,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await blogsInDb()
  expect(blogsAtEnd).toHaveLength(listWithManyBlogs.length + 1)
  const content = blogsAtEnd.map((n) => n.title)
  expect(content).toContain('Hello World by Haryo')
})

test('送信したLikes欄が空なら０を挿入する', async () => {
  const newBlog = {
    title: 'Likes Property is empty',
    author: 'Likes Empty',
    url: 'www.likes-empty.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await blogsInDb()
  const content = await blogsAtEnd[blogsAtEnd.length - 1]
  const formatted = {
    title: content.title,
    author: content.author,
    url: content.url,
    likes: content.likes,
  }
  expect(formatted).toEqual({ ...newBlog, likes: 0 })
})

test('送信したデータのtitle or urlが空なら 400 Bad Request', async () => {
  const emptyTitleBlog = {
    author: 'empty',
    likes: 10000000,
    url: 'www.url-is-not-empty.net',
  }
  const emptyURLBlog = {
    title: 'title is not empty',
    author: 'empty',
    likes: 10000000,
  }

  await api
    .post('/api/blogs')
    .send(emptyTitleBlog)
    .expect(400)
  await api
    .post('/api/blogs')
    .send(emptyURLBlog)
    .expect(400)
})

afterAll(async () => {
  await mongoose.connection.close()
})
