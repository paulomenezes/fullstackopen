import React from 'react';

import Course from './Course';

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercices: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercices: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercices: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercices: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercices: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercices: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

export default App;
