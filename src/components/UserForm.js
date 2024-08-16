import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ selectedUser, refreshUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
    }
  }, [selectedUser]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = { name, email };

    if (selectedUser) {
      axios.put(`https://jsonplaceholder.typicode.com/users/${selectedUser.id}`, user)
        .then(refreshUsers)
        .catch(error => console.error('There was an error updating the user!', error));
    } else {
      axios.post('https://jsonplaceholder.typicode.com/users', user)
        .then(refreshUsers)
        .catch(error => console.error('There was an error adding the user!', error));
    }

    setName('');
    setEmail('');
  };

  return (
    <div>
      <h2>{selectedUser ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit">{selectedUser ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
};

export default UserForm;

