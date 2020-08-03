// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

export default function LoginForm({ setError, setToken }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // GraphQLサーバーにMutationを送る。
  // 第一引数が関数となっており、variablesフィールドにMutationに渡したい引数を
  // オブジェクトとして渡すとMutationがサーバに送信される。
  // 戻り値はresultに保存されるため、それを読み取ることができる。
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      // StateとlocalStorageにトークンを保存
      setToken(token)
      localStorage.setItem('phone-numbers-user-token', token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  async function submit(event) {
    event.preventDefault()

    // useMutationで作成された関数
    // stateに一時的に保存されている値を使ってGraphQLサーバーにログイン情報を送信
    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          USERNAME <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          PASSWORD <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>LOGIN</button>
      </form>
    </div>
  )
}