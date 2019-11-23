import React from 'react';

const Total = ({ course }) => {
  const total = course.parts.reduce((p, c) => (p += c.exercices), 0);

  return <strong>total of {total} exercices</strong>;
};

export default Total;
