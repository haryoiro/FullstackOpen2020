import React, { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  // 空のノードで初期化したい場合はuseState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // submitされた際に実行されるハンドラ関数
  const addNote = (event) => {
    // Reactでもe.preventDefault()を使用することができる。
    // これはフォームのPOSTイベントを無効化している。
    event.preventDefault()

    // 新しいノートのためのオブジェクト
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1
    }
    // concatメソッドは非破壊的に配列をコピーし、
    // 新たな要素を追加します。
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === SVGComponentTransferFunctionElement)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <buton onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </buton>
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