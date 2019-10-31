import React from "react";
import ReactDOM from "react-dom";

const Header = props => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Part = props => {
  return (
    <div>
      <p>
        {props.part} {props.exercise}
      </p>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      <Part part={parts[0].name} exercise={parts[0].exercises} />
      <Part part={parts[1].name} exercise={parts[1].exercises} />
      <Part part={parts[2].name} exercise={parts[2].exercises} />
    </div>
  );
};

const Total = props => {
  const e1 = props.exercises1;
  const e2 = props.exercises2;
  const e3 = props.exercises3;

  return (
    <div>
      <p>Number of exercises {e1 + e2 + e3}</p>
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack Application development",
    parts: [
      {
        name: "Fundementals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 6
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        exercises1={course.parts[0].exercises}
        exercises2={course.parts[1].exercises}
        exercises3={course.parts[2].exercises}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
