import React from "react";
import ReactDOM from "react-dom";

const Header = props => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Parts = props => {
  const parts = props.course.parts;
  console.log("Part", parts);
  const partSplit = () =>
    parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)


  return <div>{partSplit()}</div>;
};

const Total = props => {
  const parts = props.course.parts;
  console.log("Total", parts);
  const totalExercises = () => {
    let total = 0;
    parts.forEach(element => {
      total += element.exercises
    });

    return total
  }

  return <p>Total of {totalExercises()} exercises</p>;
};

const Content = ({ course }) => {
  console.log("Content", course);
  return (
    <div>
      <Parts course={course} />
      <Total course={course} />
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content course={course} />
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3
      }
    ]
  };

  return (
    <div>
      <Course course={course} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
