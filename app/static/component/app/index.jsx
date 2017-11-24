import React from 'react';
import Statistics from 'component/reportStats/index';
import Chart from 'containter/reportChart';
import './style.scss';

const App = () => {
  return (
    <div className="app-container">
      <Chart />
      <Statistics />
    </div>
  );
};

export default App;
