import React from 'react'
import { useResource } from '../../Hooks/users.hooks'
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom'

import User from './User'
import UserList from './UserList'

// ユーザ関連コンポーネント
// ユーザ情報に関するRouteを持っている。
export default function UsersBody() {
  const [, users] = useResource('http://localhost:3000/api/users')
  const { path, url } = useRouteMatch()

  // user一覧のレスポンスをイテラブルな配列に展開
  function expandNotIterable(i, arr, emp) {
    if (typeof i !== 'number') return []
    else if (i < 0) return [...emp.filter(n => n !== undefined)]
    else if (i >= 0) return expandNotIterable(i-1, arr, [...emp, arr[i]])
  }

  // expandNotIterableをハードコーディングしなくても良いようにショートカット
  function usersExpanded() {
    return expandNotIterable(users?.length, users, [])
  }

  return (
    <div>
      <Switch>
      <Route exact path="/users">
        <UserList users={usersExpanded()}/>
      </Route>
      <Route path={`${path}/:id`}>
        <User users={usersExpanded()} url={url}/>
      </Route>
      </Switch>
    </div>
  )
}


