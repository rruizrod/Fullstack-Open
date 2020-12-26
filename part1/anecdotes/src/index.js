import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(6).fill(0), [])
  const [max, setMax] = useState({index: 0, value: 0})

  const selectRandom = () => {
    const num = Math.floor(Math.random() * 6);
    setSelected(num);
  }

  const vote = (num) => {
    const copy = {...points}
    copy[selected] += 1;
    setPoints(copy)

    if(copy[selected] > max.value){
      const copyMax = max
      copyMax.index = selected
      copyMax.value = copy[selected]
      setMax(copyMax)
    }
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button text="Vote" handleClick={() => vote()}/>
      <Button text="Next Anecdote" handleClick={() => selectRandom()}/>
      <h1>Anecdote with most Votes</h1>
      <p>{props.anecdotes[max.index]}</p>
      <p>has {points[max.index]} votes</p>
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

ReactDOM.render(
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
)