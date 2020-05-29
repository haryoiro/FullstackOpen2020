const listHelper = require('../utils/list_helper')

const {
  listWithOneBlog,
  listWithManyBlogs,
  mostLikedBlog,
  mostAuthor,
  mostLikedAuthor,
} = require('./testHelper')

test('dummy returns one', () => {
  const emptyBlog = []

  const result = listHelper.dummy(emptyBlog)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('ブログリストが一つだったとき、そのブログのLikes', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  test('ブログリストのすべてのLikesの和', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(36)
  })
  test('ブログリストが一つだったとき、最もLikeをもらったブログ', () => {
    const result = listHelper.favoriteBlogs(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog)
  })
  test('ブログリストの中で最もLikeをもらったブログ', () => {
    const result = listHelper.favoriteBlogs(listWithManyBlogs)
    expect(result).toEqual(mostLikedBlog)
  })
  test('最も記事数の多い著者', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)
    expect(result).toEqual(mostAuthor)
  })
  test('最もLikesが多い記事を持つ著者', () => {
    const result = listHelper.mostLikes(listWithManyBlogs)
    expect(result).toEqual(mostLikedAuthor)
  })
})
