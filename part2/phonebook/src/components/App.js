import React, { useState, useEffect } from 'react';

import personService from '../services/persons';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Notification from './Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState({ message: undefined, type: undefined });

  const onChangeName = event => setNewName(event.target.value);
  const onChangePhone = event => setNewPhone(event.target.value);
  const onChangeFilter = event => setFilter(event.target.value);

  const onSubmit = event => {
    event.preventDefault();

    const alreadExistIndex = persons.findIndex(p => p.name === newName);

    if (alreadExistIndex >= 0) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`,
      );

      const alreadExist = persons[alreadExistIndex];

      const newPerson = {
        ...alreadExist,
        number: newPhone,
      };

      if (confirmUpdate) {
        personService.update(alreadExist.id, newPerson).then(response => {
          const newPersonList = [...persons];
          newPersonList[alreadExistIndex] = newPerson;

          setPersons(newPersonList);
          setNewName('');
          setNewPhone('');
        });

        return;
      } else {
        return;
      }
    }

    const newPerson = {
      name: newName,
      number: newPhone,
    };

    personService.create(newPerson).then(response => {
      setPersons(persons.concat(response.data));
      setNewName('');
      setNewPhone('');

      setMessages(`Added ${newPerson.name}`, 'success');
    });
  };

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response.data);
    });
  }, []);

  const onDelete = id => {
    const person = persons.find(p => p.id === id);

    const confirmDelete = window.confirm(`Delete ${person.name}?`);

    if (confirmDelete) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
        })
        .catch(error => {
          setMessages(`Information of ${person.name} has already been removed from server`, 'error');
          setPersons(persons.filter(p => p.id !== id));
        });
    }
  };

  const setMessages = (message, type) => {
    setMessage({
      message,
      type,
    });

    setTimeout(() => {
      setMessage({ message: undefined, type: undefined });
    }, 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.message} type={message.type} />
      <Filter filter={filter} onChange={onChangeFilter} />
      <h2>Add a new</h2>
      <PersonForm
        name={newName}
        phone={newPhone}
        onChangeName={onChangeName}
        onChangePhone={onChangePhone}
        onSubmit={onSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} onDelete={onDelete} />
    </div>
  );
};

export default App;
