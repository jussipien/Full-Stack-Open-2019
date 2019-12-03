import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ text }) => <><h1>{text}</h1></>

const TableHeader = ({ text }) => <><thead><tr><th><Header text={text}/></th></tr></thead></>

const Button = ({ onClick, text }) => <><button onClick={onClick}>{text}</button></>

const Statistic = ({ text, value }) => <><tr><td>{text}</td><td>{value}</td></tr></>

const Feedback = ({ buttons }) => {
    const b1 = buttons[0]
    const b2 = buttons[1]
    const b3 = buttons[2]

    return (
        <section>
            <Header text="give feedback"/>
            <Button onClick={() => b1[1](b1[0])} text="good"/>
            <Button onClick={() => b2[1](b2[0])} text="neutral"/>
            <Button onClick={() => b3[1](b3[0])} text="bad"/> 
        </section>
    )
}

const Statistics = ({ buttons }) => {
    const b1 = buttons[0]
    const b2 = buttons[1]
    const b3 = buttons[2]

    const all = b1[0]+b2[0]+b3[0]
    const average = (b1[0]-b3[0])/all
    const positive = (b1[0]/all)*100
    const positiveStr = positive.toString().concat(' %')

    if ([b1[0], b2[0], b3[0]].some(x => x > 0)) {
      return (
        <section>
          <table>
            <TableHeader text="statistics"/>
            <tbody>
              <Statistic text="good" value={b1[0]}/>
              <Statistic text="neutral" value={b2[0]}/>
              <Statistic text="bad" value={b3[0]}/>
              <Statistic text="all" value={all}/>
              <Statistic text="average" value={average}/>
              <Statistic text="positive" value={positiveStr}/>
            </tbody>
          </table>
        </section>
      )
    } else {
      return (
        <b>No feedback given</b>
      )
    }
    
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleSetGood = (good) => setGood(good+1)
  const handleSetNeutral = (neutral) => setNeutral(neutral+1)
  const handleSetBad = (bad) => setBad(bad+1)
  const buttons = [[good, handleSetGood], [neutral, handleSetNeutral], [bad, handleSetBad]]

  return (
    <div>
      <Feedback buttons={buttons}/>
      <Statistics buttons={buttons}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))