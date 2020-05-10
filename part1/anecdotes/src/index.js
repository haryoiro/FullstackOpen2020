import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)
const Display = ({ text }) => (
  <div>{text}</div>
)
const DisplayVote = ({ text }) => (
  <div>has {text} votes</div>
)
const intRandom = (min, max) => {
  return Math.floor( Math.random() * (max + 1 - min) ) + min
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(props.anecdotes.length))
  const [mostVote, setMostVote] = useState(0)

  const randomAnecdote = () => {
    setSelected(intRandom(0, props.anecdotes.length - 1))
  }
  const voteToIndex = () => {
    const newPoints = [...points]
    newPoints[selected]++
    setPoints(newPoints)
  }

  useEffect(() => {
    setMostVote(maxVote())
  }, [points])

  const maxVote = () => {
    return points.indexOf(Math.max(...points))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Display text={props.anecdotes[selected]}/>
      <DisplayVote text={points[selected]} />
      <Button onClick={voteToIndex} text="Vote"/>
      <Button onClick={randomAnecdote} text="Next anecdote" />

      <h1>Anecdote with most votes</h1>
      <Display text={props.anecdotes[mostVote]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes}/ >, document.getElementById("root"))