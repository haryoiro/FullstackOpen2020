import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content part={course.parts} />
      <Total part={course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => <div>{props.part.map((part) => <Parts title={part.name} exercises={part.exercises} />)}</div>

const Parts = (props) => <p>{props.title} {props.exercises}</p>

const sum = (acc, cur) => { return acc + cur }

const Total = (props) => {
  const result = props.part
    .map(par => par.exercises)
    .reduce(sum)
  return (
    <div>
      <p>Number of exercises {result}</p>
    </div>
  )
}

ReactDOM.render(<App2 />, document.getElementById('root'))