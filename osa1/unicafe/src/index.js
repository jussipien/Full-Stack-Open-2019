import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = ({ text }) => <><h1>{text}</h1></>

const Button = ( {onClick, text}) => <><button onClick={onClick}>{text}</button></>

const Feedback = () => {
    return (
        <section>
            <Header text='give feedback'/>
        </section>
    )
}

import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      
      <Header text='statistics'/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))