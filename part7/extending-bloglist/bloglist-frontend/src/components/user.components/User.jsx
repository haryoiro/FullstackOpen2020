import React from 'react'
import {
  useParams
} from 'react-router-dom'

export default function User({ users }) {
  const { id } = useParams()

  const user = users.find(u => u.id === id)

  if (!user) { return null }

  function CurrentUserBlogs() {
    if (user.blogs.length === 0) {
      return <>Blog is not exists</>
    } else {
      return (
        <div>
          <h4>ADDED BLOGS</h4>
          <ul>
            {user.blogs.map(b => (
              <li key={b.id}>{b.title}</li>
            ))}
          </ul>
        </div>
      )
    }
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <CurrentUserBlogs />
    </div>
  )
}
