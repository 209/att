import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Info from '../info';
import GoTo from '../goto';
import Pagination from '../pagination';

import './style.scss';

class Footer extends Component {
  static propTypes = {
    page:             PropTypes.number,
    total:            PropTypes.number,
    totalPages:       PropTypes.number,
    begin:            PropTypes.number,
    end:              PropTypes.number,
    handleChangePage: PropTypes.func,
  };

  render() {
    const {
      page,
      total,
      totalPages,
      begin,
      end,
      handleChangePage,
    } = this.props;

    return (
      <div className="report-footer">
        <Info begin={begin} end={end} total={total} />
        <GoTo page={page} totalPages={totalPages} handleChangePage={handleChangePage} />
        <Pagination page={page} totalPages={totalPages} handleChangePage={handleChangePage} />
      </div>
    );
  }
}

export default Footer;
