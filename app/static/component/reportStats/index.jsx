import React, { Component } from 'react';

import Table from 'containter/reportStats/table';
import Limit from 'containter/reportStats/limit';

class Report extends Component {
  render() {
    return (
      <div>
        <Limit />
        <Table />
      </div>
    );
  }
}

export default Report;
