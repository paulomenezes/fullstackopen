import React from 'react';

import Person from './Person';

const PersonForm = ({ persons, filter, onDelete }) => {
  const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      {filteredPersons.map(person => (
        <Person key={person.name} person={person} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default PersonForm;
