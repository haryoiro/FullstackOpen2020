import React from 'react'
import { useSelector } from 'react-redux'
import {
  Link
} from 'react-router-dom'

export default function BlogList() {
  const blogs = useSelector((n) => n.blogs)

  function blogSorter(a, b) {
    if (a.likes < b.likes) return 1
    if (a.likes > b.likes) return -1
    return 0
  }

  return (
    <div className="body-container-main">
      {blogs.sort(blogSorter).map((blog) => (
        <Link to={`/blogs/${blog.id}`} key={blog.id}>
          
          <div className="body-container-main-bloglist">
          <div className="body-container-main-bloglist-thumbnail"></div>
            <div className="body-container-main-bloglist-title">
              {blog.title}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
