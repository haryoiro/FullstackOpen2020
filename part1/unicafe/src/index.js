import React, { useState, useEffect }from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => ( <button onClick={onClick}>{text}</button> )
const Answer = ({ text, content }) => ( <div>{text} {content}</div> )
const Positive = ({ text, content }) => (
  <div>{text} {content}%</div>
)
const Statistics = ({ good, neutral, bad, all, avarage, positive }) => (
  <div>
    <Answer text="Good" content={good} />
    <Answer text="Neutral" content={neutral} />
    <Answer text="Bad" content={bad} />
    <Answer text="ALL" content={all} />
    <Answer text="Avarage" content={avarage} />
    <Positive text="Positive" content={positive} />
  </div>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [score, setScore] = useState(0)
  const [avarage, setAvarage] = useState(0)
  const [positive, setPositive] = useState(0)


  const increaseGood = () => {
    setGood(good + 1)
    setScore(score + 1)
    increaseAll()
  }
  const increaseNeutral = () => {
    setNeutral(neutral + 1)
    setScore(score)
    increaseAll()
  }
  const increaseBad = () => {
    setBad(bad + 1)
    setScore(score - 1)
    increaseAll()
  }

  const increaseAll = () => {
    setAll(all + 1)
  }

  useEffect(() => {
    if (isNaN(score / all) || isNaN(all / good)) {
      setAvarage(0)
      setPositive(0)
    }
    else {
      setAvarage(score / all)
      setPositive(good / all * 100)
    }
  }, [good, score, all])


  return (
    <div>
      <h1>give feedbak</h1>
      <Button onClick={increaseGood} text="Good"/>
      <Button onClick={increaseNeutral} text="Neutral"/>
      <Button onClick={increaseBad} text="Bad" />
      <h1>statistics</h1>
      {all !== 0
        ? <Statistics good={good} neutral={neutral} bad={bad} all={all} avarage={avarage} positive={positive} />
        : <div>No feedback given</div>
      }
    </div>
  )
}

ReactDOM.render( <App />, document.getElementById('root') )