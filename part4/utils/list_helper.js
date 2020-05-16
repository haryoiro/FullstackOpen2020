const dummy = () => 1

const totalLikes = (blogs) => blogs.reduce((sum, item) => sum + item.likes, 0)

const favoriteBlogs = (blogs) => {
  const result = blogs.sort((a, b) => a.likes <= b.likes)
  return [result[0]]
}

const mostBlogs = (blogs) => {
  const result = [...blogs.sort((a, b) => a.author < b.author)].map(
    (blog) => blog.author,
  )
  const mostAuthor = result[0]
  const blogSize = result.filter((bl) => bl === mostAuthor).length
  return { author: mostAuthor, blogs: blogSize }
}

const mostLikes = (blogs) => {
  const result = [...favoriteBlogs(blogs)][0]
  return { author: result.author, likes: result.likes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs,
  mostLikes,
}
