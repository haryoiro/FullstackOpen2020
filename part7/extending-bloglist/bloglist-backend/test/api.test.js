const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const api = supertest(require('../app'))

const Blog = require('../model/blog.model')
const User = require('../model/user.model')

const {
  listWithManyBlogs,
  blogsInDb,
  usersInDb,
  testUser,
} = require('./testHelper')

let token = null

beforeAll(async () => {
  await Blog.deleteMany({})

  /* eslint-disable no-await-in-loop */
  for (const blog of listWithManyBlogs) {
    const noteObject = new Blog(blog)
    await noteObject.save()
  }
  /* eslint-enable no-await-in-loop */
})

describe('/api/blogs', () => {
  test('レスポンスをJSON形式で返す', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    console.log(res.body)
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

    await api.get(`/api/blogs/${nonID}`).expect(400)
  })

  test('存在しないIDがリクエストされた時404エラーを返す', async () => {
    const nonExistId = '5ec234b70d80164b7590854e'

    await api.get(`/api/blogs/${nonExistId}`).expect(404)
  })
})

describe('/api/users', () => {
  beforeAll(async () => {
    await User.deleteMany({})

    // テスト用のルートユーザ
    // apiと同じキーとストレッチを行う。
    const passwordHash = await bcrypt.hash('secretKey', 10)
    const user = await new User({ username: 'root', password: passwordHash })

    await user.save()
  })

  test('ユーザ一覧をJSON形式で取得できる', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('ユーザを新規作成することができる', async () => {
    const startAtUsers = await usersInDb()

    await api.post('/api/users').send(testUser).expect(200)

    const createdUsers = await usersInDb()
    expect(createdUsers).toHaveLength(startAtUsers.length + 1)
  })

  test('ユーザ名かパスワードが3文字以下なら400 Bad Request', async () => {
    const startAtUsers = await usersInDb()

    const user = {
      username: 'a',
      password: 'a',
      blogs: [],
    }

    await api.post('/api/users').send(user).expect(400)

    const endAtUsers = await usersInDb()
    expect(endAtUsers).toHaveLength(startAtUsers.length)
  })

  test('username or passwordどちらかのフィールドが空なら400 Bad Request', async () => {
    const startAtUsers = await usersInDb()

    const passwordEmpty = {
      username: 'password is empty',
      name: 'name',
    }
    const usernameEmpty = {
      name: 'name',
      password: 'username is empty',
    }

    await api.post('/api/users').send(usernameEmpty).expect(400)
    await api.post('/api/users').send(passwordEmpty).expect(400)

    const endAtUsers = await usersInDb()
    expect(endAtUsers).toHaveLength(startAtUsers.length)
  })

  test('ログインできる', async () => {
    const startUser = {
      username: 'superMan',
      password: 'secret1',
    }

    await api.post('/api/login').send(startUser).expect(200)
  })
})

describe('データを正常に挿入できる', () => {
  test('新しいblog評価を追加する', async () => {
    const startUser = {
      username: 'superMan',
      password: 'secret1',
    }
    const res = await api.post('/api/login').send(startUser)
    token = res.body.token

    const newBlog = {
      title: 'Hello World by Haryo',
      author: 'Haryoiro',
      url: 'www.example.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .auth(token, { type: 'bearer' })
      .expect(200)
  })

  test('送信したLikes欄が空なら０を挿入する', async () => {
    const newBlog = {
      title: 'Likes Property is empty',
      author: 'Likes Empty',
      url: 'www.likes-empty.com',
    }

    const savedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .auth(token, { type: 'bearer' })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // console.log(savedBlog)
    expect(savedBlog.body).toHaveProperty('likes', 0)
  })

  test('送信したデータのtitle or urlが空なら 400 Bad Request', async () => {
    const emptyTitleBlog = {
      author: 'empty',
      likes: 10000000,
      url: 'www.url-is-not-empty.net',
    }

    await api
      .post('/api/blogs')
      .send(emptyTitleBlog)
      .auth(token, { type: 'bearer' })
      .expect(400)
  })
})

describe('データの削除', () => {
  test('データを正常に削除できる', async () => {
    const allBlogs = await blogsInDb()
    // const allUsers = await usersInDb()
    const loggedInUser = allBlogs[allBlogs.length - 1]
    const user = await api.get(`/api/users/${loggedInUser.user}`)

    const deleteBlogId = user.body.blogs[1]
    await api
      .delete(`/api/blogs/${deleteBlogId}`)
      .auth(token, { type: 'bearer' })
      .expect(204)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(allBlogs.length)

    const contents = blogsAtEnd.map((r) => r.title)
    expect(contents).not.toContain(loggedInUser.title)
  })

  test('投稿主以外のトークンで削除しようとすると401', async () => {
    const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN1cGVyTWFuIiwiaWQiOiI1ZWM2NTJkMGRlZDljM2M4ZTk4OWE0YzAiLCJpYXQiOjE1OTA0NzM3MDN9.0E1XfpFxNzjngGr2d4UfhrxbgxoDg1JWpimHekDisAs'

    const allBlogs = await blogsInDb()
    const deleteBlog = allBlogs[allBlogs.length - 2]

    await api
      .delete(`/api/blogs/${deleteBlog.id}`)
      .auth(invalidToken, { type: 'bearer' })
      .expect(401)
  })

  test('存在しないIDの削除を試みると401', async () => {
    const nonExistId = '5ec234b70d80164b7590812e'

    const end = await api
      .delete(`/api/blogs/${nonExistId}`)
      .auth(token, { type: 'bearer' })
      .expect(404)

    expect(end.text).toContain('Blog not found')
  })
})

describe('データのアップデート', () => {
  test('データを正しくアップデートできる', async () => {
    const allBlogs = await blogsInDb()
    const blogToUpdate = allBlogs[0]

    const blog = { title: 'Updated' }

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(blog).expect(204)

    const updatedAllBlogs = await blogsInDb()
    expect(updatedAllBlogs).toHaveLength(allBlogs.length)

    const updatedFirstBlog = updatedAllBlogs[0]
    expect(updatedFirstBlog).toEqual({ ...blogToUpdate, title: 'Updated' })
  })
})

afterAll(async () => {
  mongoose.connection.close()
})
