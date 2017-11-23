import React, { Component } from 'react';

import Footer from 'containter/reportStats/footer';
import Table from 'containter/reportStats/table';
import Limit from 'containter/reportStats/limit';

import './style.scss';

class Report extends Component {
  render() {
    return (
      <div className="report">
        <Limit />
        <Table />
        <Footer handleChangePage={this.props.handleChangePage}/>
      </div>
    );
  }
}

export default Report;
