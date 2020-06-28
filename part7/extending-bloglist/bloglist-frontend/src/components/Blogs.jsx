import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

function Blogs() {
  const blogs = useSelector((n) => n.blogs)

  function blogSorter(a, b) {
    if (a.likes < b.likes) return 1
    if (a.likes > b.likes) return -1
    return 0
  }

  return (
    <div>
    {blogs.sort(blogSorter).map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
    </div>
  )
}

export default Blogs