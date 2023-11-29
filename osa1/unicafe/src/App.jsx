import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}> {text} </button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const sum = props.good + props.neutral + props.bad
  if (sum === 0) {
    return (
      <div>
        <p>No feedback given yet.</p>
      </div>
    )
  } 
  return (
    <div>
      <h2>Statistics:</h2>
      <table>
        <tbody>
          <StatisticLine text='good' value={props.good} />
          <StatisticLine text='neutral' value={props.neutral} />
          <StatisticLine text='bad' value={props.bad} />
          <StatisticLine text='all' value={sum} />
          <StatisticLine text='average' value={((props.good * 1 + props.neutral * 0 + props.bad * (-1))/sum).toFixed(1)}/>
          <StatisticLine text='positive' value={`${parseFloat((props.good / sum) * 100).toFixed(1)} %`} />
        </tbody>
      </table>
    </div>
  )
  }

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => {
    setGood(good + 1)
  }

  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleClickBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback to Unicafe!</h1>
      <Button handleClick={handleClickGood} text='good'/>
      <Button handleClick={handleClickNeutral} text='neutral'/>
      <Button handleClick={handleClickBad} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App