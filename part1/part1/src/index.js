import React from "react";
import ReactDOM from "react-dom";

const Hello = props => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age}
      </p>
    </div>
  );
};
const App = () => {
  const name = "Peter";
  const age = 10;

  return (
    <div>
      <h1>Greetings!</h1>
      <Hello name="Adeisha" age={10 + 9} />
      <Hello name={name} age={age} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
