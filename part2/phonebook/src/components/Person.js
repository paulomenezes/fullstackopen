import React from 'react';

const Person = ({ person, onDelete }) => {
  return (
    <div>
      {person.name} {person.number} <button onClick={() => onDelete(person.id)}>delete</button>
    </div>
  );
};

export default Person;
