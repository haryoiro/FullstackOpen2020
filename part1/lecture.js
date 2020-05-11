import React from '../node_modules/@types/react';
import ReactDOM from '../node_modules/@types/react-dom';
import './index.css';

const App1 = () => {
  const now = new Date()
  const a = 10
  const b = 20
  return (
    <div>
      <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
    </div>
  )
}

// It's actually an App component written in basic JavaScript notation,
//  but its code is covered by JSX.
const App2 = () => {
  const now = new Date()
  const a = 10
  const b = 20
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p', null, 'Hello world, it is ', now.toString()
    ),
    React.createElement(
      'p', null, a, ' plus ', b, ' is ', a + b
    )
  )
}

const App3 = () => {
  return (
    <div>
      <h1>Greething</h1>
      <Hello name="sam"/>
      <Hello name="jim"/>
      <Hello name="jon"/>
    </div>
 )
}

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}</p>
    </div>
  )
}
const Hello2 = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}


// React component (usually) needs to contain one root element.
const Footer = () => {
  return (
    <div>
      greeting app created by <a href="https://github.com/haryoiro">Haryoiro</a>
    </div>
  )
}

const App4 = () => {
  const name = 'Peter'
  const age = 10

  return (
    <>
      <h1>Greething</h1>
      <Hello2 name="Maya" age={26 + 10}/>
      <Hello2 name={name} age={age} />
      <Footer />
    </>
  )
}

const Hello3 = (props) => {
  const bornYear = () => {
    const yearNow = new Date().getFullYear()
    return yearNow - props.age
  }

  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const Hello4 = (props) => {
  const { name, age } = props
  const bornYear = () => {
    return new Date().getFullYear() - age
  }

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}


const Hello5 = ({ name, age }) => {
  const bornYear = () => {
    return new Date().getFullYear() - age
  }

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

// useState !!!!!!!!!!!!!!!!
//                          ↓ useState module!
import React, { useState }from 'react'
import ReactDOM from 'react-dom'

const Counter = () => {
  // 第一引数にデフォルトに指定したい数を指定
  const [counter, setCounter] = useState(0)

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  return(
    <div>{counter}</div>
  )
}

// --------------------------------------------------
// より細かいコンポーネントに分ける
// 分割代入を使用して表記をわかりやすく
const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ handleClick, text}) => <button onClick={handleClick}>{text}</button>


const App2 = () => {
  // Hooksはよりかんたんに状態を管理することができる。
  const [counter, setCounter] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  return (
    <>
      <Display counter={counter}/>
      <Button handleClick={increaseByOne} text="Plus" />
      <Button handleClick={setToZero} text="Zero" />
      <Button handleClick={decreaseByOne} text="Minus" />
    </>
  )
}
// --------------------------------------------------
const History = ({allClicks}) => {
  if (allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {allClicks.join(' ')}
    </div>
  )
}
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const App2 = props => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1 )
  }
  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1 )
  }
  return (
    <div>
      <div>
        {left}
        <Button onClick={handleLeftClick} text="left" />
        <Button onClick={handleRightClick} text="right" />
        {right}
        <History allClicks={allClicks}/>
      </div>
    </div>
  )
}


ReactDOM.render(<App4 />, document.getElementById('root'));

