import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ event, text }) => {
  return <button onClick={event}>{text}</button>;
};

const App = props => {
  const INITIAL_VOTE = {
    list: [0, 0, 0, 0, 0, 0]
  };
  const INITIAL_TOP = {
    anec: "",
    topVote: 0
  };

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(INITIAL_VOTE);
  const [top, setTop] = useState(INITIAL_TOP);

  const setRandom = () => {
    return setSelected(Math.floor(Math.random() * 6));
  };

  const setToVote = sel => {
    const copy = { ...vote };
    // increment the property 2 value by one
    copy.list[sel] += 1;

    if (copy.list[sel] > top.topVote) {
      const topCopy = { top };
      topCopy.anec = props.anecdotes[sel];
      topCopy.topVote = copy.list[sel];

      setTop(topCopy);
    }

    setVote(copy);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <Button event={() => setRandom()} text="Next Anecdote" />
      <Button event={() => setToVote(selected)} text="Vote" />
      <p>Has {vote.list[selected]} votes.</p>

      <h1>Anecdote with the most votes</h1>
      <p>{top.anec}</p>
      <p>Has {top.topVote} votes.</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
