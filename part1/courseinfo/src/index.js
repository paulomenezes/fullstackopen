import React from 'react';
import ReactDOM from 'react-dom';

const Header = props => <h1>{props.course.name}</h1>;

const Part = props => (
  <p>
    {props.part.name} {props.part.exercices}
  </p>
);

const Content = props => (
  <>
    <Part part={props.course.parts[0]} />
    <Part part={props.course.parts[1]} />
    <Part part={props.course.parts[2]} />
  </>
);

const Total = props => (
  <p>
    Number of exercices{' '}
    {props.course.parts[0].exercices + props.course.parts[1].exercices + props.course.parts[2].exercices}
  </p>
);

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercices: 10,
      },
      {
        name: 'Using props to pass data',
        exercices: 7,
      },
      {
        name: 'State of a component',
        exercices: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
