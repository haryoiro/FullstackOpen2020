import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // useEffectはデフォルトでレンダリング完了時に実行される
  // 下のようにオブジェクトに分けると特定の値が変更された場合にのみ
  // 実行するなどの処理を記述することができる。
  // const hook = () => {
  //   console.log('effect')

  //   const eventHandler = res => {
  //     console.log('promise fulfilled')
  //     setNotes(res.data)
  //   }

  //   axios
  //     .get('http://localhost:3001/notes')
  //     .then(eventHandler)
  // }

  // 第2引数にはEffectを実行する頻度を指定します。
  // []の場合、コンポーネントの最初のレンダリングでのみ実行
  // 空にしてしまうと毎秒実行される
  // useEffect(hook, [])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(res => {
        console.log(res.data)
        setNotes(res.data)
      })
  }, [])

  console.log('render', notes.length, 'notes')

  // submitされた際に実行されるハンドラ関数
  const addNote = (event) => {
    event.preventDefault()
    // 新しいノートのためのオブジェクト
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1
    }
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <Note key={note.id} note={note}/>))
        }
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App