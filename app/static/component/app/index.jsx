import React from 'react';
import TicketsList from 'containter/ticketsList';
import LogoTop from 'ui/img/LogoTop';
import './style.scss';

const App = () => {
  return (
    <div className="app-container">
      <header>
        <LogoTop />
      </header>
      <footer>
        <TicketsList />
      </footer>
    </div>
  );
};

export default App;
