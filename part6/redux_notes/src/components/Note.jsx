import { toggleImportanceOf } from '../reducers/noteReducer'

import React from 'react'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'

function Note ({ note, onClick }) {
  return (
    <li onClick={() => onClick(note.id)}>
      {note.content} <strong>{note.important ? 'important' : ''}</strong>
    </li>
  )
}

function Notes (props) {
  const dispatch = useDispatch()

  // const notes = useSelector(({filter, notes}) => {
  //   if (filter === 'ALL') {
  //     return notes
  //   }
  //   return filter === 'IMPORTANT'
  //     ? notes.filter((note) => note.important)
  //     : notes.filter((note) => !note.important)
  // })
  return (
    <ul>
    {props.notes.map((note) =>
      <Note
        key={note.id}
        note={note}
        onClick={() => props.toggleImportanceOf(note.id)}
        />
    )}
    </ul>
  )
}

const mapStateToProps = (state) => {
  if (state.filter === 'ALL') {
    return {
      notes: state.notes
    }
  }
  return {
    notes: (state.filter === 'IMPORTANT'
      ? state.notes.filter((note) => note.important)
      : state.notes.filter((note) => !note.important)
    )
  }
}
// importしたActionをmapDispatchToPropsに渡したものを、更にconnect関数にわたすと
// props.<actioncrator>の形でアクセスできるようになる。
const mapDispatchToProps = {
  toggleImportanceOf,
}

const ConnectedNotes = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notes)

export default ConnectedNotes