const mongoose = require('mongoose')
const supertest = require('supertest')
const api = supertest(require('../app'))

const Blog = require('../model/blog')

const {
  listWithManyBlogs,
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

describe('テスト用データが正常に取得できる', () => {
  test('レスポンスをJSON形式で返す', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('レスポンスに含まれるデータがテストデータの長さと一致する', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(listWithManyBlogs.length)
  })

  test('データの一意キーが"id"となっているか', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test('ブログの中に特定のタイトルが含まれている', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map((r) => r.title)

    expect(titles).toContain('React patterns')
  })
})

describe('データが正常に返ってくる', () => {
  test('IDを通して個別のデータを正常に見ることができる', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })

  test('IDではないデータがリクエストされた時400エラーを返す', async () => {
    const nonID = { content: 'nonID' }

    await api
      .get(`/api/blogs/${nonID}`)
      .expect(400)
  })

  test('存在しないIDがリクエストされた時404エラーを返す', async () => {
    const nonExistId = '5ec234b70d80164b7590854e'

    await api
      .get(`/api/blogs/${nonExistId}`)
      .expect(404)
  })
})

describe('データを正常に挿入できる', () => {
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
})
describe('データの削除', () => {
  test('データを正常に削除できる', async () => {
    const allBlogs = await blogsInDb()
    const blogToDelete = allBlogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(allBlogs.length - 1)

    const contents = blogsAtEnd.map((r) => r.title)
    expect(contents).not.toContain(blogToDelete.title)
  })

  test('存在しないIDの削除を試みると404', async () => {
    const nonExistId = '5ec234b70d80164b7590812e'

    const end = await api
      .delete(`/api/blogs/${nonExistId}`)
      .expect(404)

    expect(end.text).toContain('Blog not found')
  })
})

describe('データのアップデート', () => {
  test('データを正しくアップデートできる', async () => {
    const allBlogs = await blogsInDb()
    const blogToUpdate = allBlogs[0]

    const blog = { title: 'Updated' }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blog)
      .expect(204)

    const updatedAllBlogs = await blogsInDb()
    expect(updatedAllBlogs).toHaveLength(allBlogs.length)

    const updatedFirstBlog = updatedAllBlogs[0]
    expect(updatedFirstBlog).toEqual({ ...blogToUpdate, title: 'Updated' })
  })
})


afterAll(async (done) => {
  mongoose.connection.close()
  done()
})
