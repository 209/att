import React from 'react';
import Users from 'containter/users';
import './style.scss';

const App = () => {
  return (
    <div className="app-container">
      <header>Users</header>
      <footer>
        <Users />
      </footer>
    </div>
  );
};

export default App;
