import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
  return(
    <button onClick={() => props.handleClick()}>{props.text}</button>
  )
}

const Statistic = (props) => {
  return(
    <tbody>
      <tr key={props.text}>
        <th>{props.text}</th>
        <th>{props.value}</th>
      </tr>
    </tbody>
  )
}

const Statistics = (props) => {

  const getTotal = () =>{
    return props.good + props.neutral + props.bad;
  }

  const getAvg = () =>{
    return (props.good + (props.bad * (-1)) + (props.neutral * 0)) / getTotal()
  }

  if(getTotal() === 0){
    return(
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }

  return(
    <>
      <h1>Statistics</h1>
      <table>
        <Statistic text="Good" value={props.good}/>
        <Statistic text="Neutral" value={props.neutral}/>
        <Statistic text="Bad" value={props.bad}/>
        <Statistic text="All" value={getTotal()}/>
        <Statistic text="Average" value={getAvg()}/>
        <Statistic text="Positive" value={(props.good / getTotal()) * 100}/>
      </table>
    </>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="good" handleClick={() => setGood(good + 1)}/>
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)}/>
      <Button text="bad" handleClick={() => setBad(bad + 1)}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App/>,
  document.getElementById('root')
);
