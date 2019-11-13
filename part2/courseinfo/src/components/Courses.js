import React from 'react'

const Header = props => {
    return (
        <div>
            <h2>{props.course}</h2>
        </div>
    );
};

const Parts = props => {
    const parts = props.course.parts;
    const partSplit = () =>
        parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)

    return <div>{partSplit()}</div>;
};

const Total = ({ course }) => {
    const parts = course.parts.map(part => part.exercises);
    const totalExercises = parts.reduce((s, p) => {
        return s + p
    }, 0)

    return <h4>Total of {totalExercises} exercises</h4>;
};

const Content = ({ course }) => {
    return (
        <div>
            <Parts course={course} />
            <Total course={course} />
        </div>
    );
};

const Course = props => {
    const courses = props.course
    const courseRend = courses.map(course => {
        return (
            <div key={course.id}>
                <Header course={course.name} />
                <Content course={course} />
            </div>
        )
    })

    return (
        <div>
            {courseRend}
        </div>
    );
};

export default Course