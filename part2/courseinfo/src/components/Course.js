import React from 'react'

const Header = (props) => {
    return (
        <h2>{props.course}</h2>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.name} {props.exercises}
      </p>
    )
  }
  
  const Content = (props) => {
    return (
      <>
        {
        props.parts.map(part =>
          <Part key={part.id} name={part.name} exercises={part.exercises}/>
          )
        }
      </>
    )
  }
  
  const Total = ({parts}) => {
  
    const total = parts.reduce(
      (ret, currentVal) => {
        return ret + currentVal.exercises
      }
    , 0)
  
    return (
      <h3>Total of {total} exercises</h3>
    )
  }
  
  const Course = ({course}) => {
    return (
      <>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </>
    )
  }

  export default Course