import React from 'react'
import {
  Link
} from 'react-router-dom'

// ユーザ一覧コンポーネント
// ユーザはそれぞれリンクになっており、投稿したBlog一覧も見れるようになっている。
export default function UserList({ users, url }) {
  return (
    <>
    <h2>USERS</h2>
    <table>
      <thead>
        <tr>
          <th>USERNAME</th>
          <th>BLOGS</th>
          <th>CREATED</th>
        </tr>
      </thead>
      <tbody>
        {users.map(n => (
          <tr key={n.id}>
            <td><Link to={`users/${n.id}`}><strong>{n.username}</strong></Link></td>
            <td>{n.blogs.length}</td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}
