import React, { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import axios from 'axios';

function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  const refreshUsers = () => {
    setSelectedUser(null);
  };

  const selectUser = (user) => {
    setSelectedUser(user);
  };

  const deleteUser = (userId) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(refreshUsers)
      .catch(error => console.error('There was an error deleting the user!', error));
  };

  return (
    <div className="App">
      <UserForm selectedUser={selectedUser} refreshUsers={refreshUsers} />
      <UserList selectUser={selectUser} deleteUser={deleteUser} />
    </div>
  );
}

export default App;
