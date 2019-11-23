import React from 'react';

const PersonForm = ({ onSubmit, name, phone, onChangeName, onChangePhone }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={onChangeName} />
      </div>
      <div>
        phone: <input value={phone} onChange={onChangePhone} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
