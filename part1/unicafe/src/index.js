import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = props => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistic = ({ text, value }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  if (good === 0 && bad === 0 && neutral === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    );
  }

  const total = good + bad + neutral;
  const avg = (good * 1 + bad * -1) / total;
  const pos = (good / total) * 100;

  return (
    <div>
      <table>
        <Statistic text="Good:" value={good} />
        <Statistic text="Neutral:" value={neutral} />
        <Statistic text="Bad:" value={bad} />
        <Statistic text="Average:" value={avg} />
        <Statistic text="Positive:" value={pos} />
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setToGood = newVal => () => setGood(newVal);

  const setToNeutral = newVal => () => setNeutral(newVal);

  const setToBad = newVal => () => setBad(newVal);

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button handleClick={setToGood(good + 1)} text="Good" />
      <Button handleClick={setToNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={setToBad(bad + 1)} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
