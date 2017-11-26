import React, { Component } from 'react';
import { superuserGateId } from 'common/user';
import tableColumns from './tableColumns';
import { SERVER_URL } from '../constants';
import { transitionTo } from 'common/utils';
import DataTable from './DateTable';
import Messenger from 'common/messenger';
import {
  CODE_ENTER,
} from '../constants';

const styles = {
  table: {
    th:      {
      textAlign: 'center',
      fontSize:  14,
    },
    thStart: {
      textAlign:  'center',
      background: 'white',
      cursor:     'default',
    },
  },
};

class TableGate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
    }
  }

  handleRowCallback(row, data, index) {
    const columns = this.api().context[0].aoColumns;

    for (let i in columns) {
      const fieldCritical = `${columns[i].data}_critical`;
      const fieldWarning = `${columns[i].data}_warning`;
      const isCritical = data.hasOwnProperty(fieldCritical);
      const isWarning = data.hasOwnProperty(fieldWarning);
      const critical = isCritical && data[fieldCritical];
      const warning = isWarning && data[fieldWarning];

      if (isCritical && isWarning) {
        if (critical < warning) { // the less the worse
          if (data[columns[i].data] <= critical) {
            jQuery(`td:eq(${i.toString()})`, row).addClass('critical');
          }
        } else if (data[columns[i].data] >= critical) {
          jQuery(`td:eq(${i.toString()})`, row).addClass('critical');
        }
      }
      if (columns[i].data.match(/(_btr|_str|_cpc)/)) {
        jQuery(`td:eq(${i.toString()})`, row).html(data[columns[i].data].toFixed(2)); // BTR, STR, CPC are floats and should be rounded
      }
    }
  }

  handleComplete = () => {
    this.props.handleChangeLoad({
      isLoaded:  true,
      isLoading: false,
    });
  };

  handleBeforeSend = () => {
    this.props.handleChangeLoad({
      isLoaded:  false,
      isLoading: true,
    });
  };

  handleError = () => {
    this.props.handleChangeLoad({
      isLoaded:  false,
      isLoading: false,
    });
  };

  handleChangePageKeyPress = event => {
    if (event.charCode !== CODE_ENTER) {
      return
    }

    const targetPage = parseInt(event.target.value) - 1;

    if (isNaN(targetPage) || (targetPage < 0)) {
      vex.dialog.alert('Wrong page number!');
    } else {
      this.setState({
        page: targetPage,
      });
    }
  }

  render() {
    const hostsNames = [
      'WEB',
      'iPhone',
      'iPad',
      'Android',
      'Mobile Web',
      'Other',
    ];
    const columnNames = [
      'Srchs',
      'Clicks',
      'BC',
      'CBC',
      'PBC',
      'BTR',
      'STR',
      'CPC',
    ];
    let columnNames8 = [];
    for (let i = 0; i < 8; i += 1) {
      columnNames8 = columnNames8.concat(columnNames);
    }
    const data = {
      from:    this.state.timeframe.from,
      to:      this.state.timeframe.to,
      gate_id: superuserGateId,
    };
    const {
      page,
    } = this.state;
    const {
      isLoading,
      isLoaded,
    } = this.props;

    return (
      <div>
        <DataTable
          suffix="report"
          tableColumns={tableColumns}
          data={data}
          handleRowCallback={this.handleRowCallback}
          handleComplete={this.handleComplete}
          handleBeforeSend={this.handleBeforeSend}
          handleError={this.handleError}
          page={page}
        >
          <thead>
          <tr>
            <th rowSpan="2" style={styles.table.thStart}>Date</th>
            {hostsNames.map(item => <th colSpan="8" style={styles.table.th}>{item}</th>)}
          </tr>
          <tr>
            {columnNames8.map(item => <th>{item}</th>)}
          </tr>
          </thead>
          <tbody />
        </DataTable>
        {
          isLoading ?
            <div className="pagination-overlay-loading" style={styles.paginationOverlayLoading}>Loading...</div> :
            null
        }
        {
          isLoaded ?
            <div className="pagination-goto" style={styles.paginationGoTo}>
              <label style={styles.paginationGoToLabel}>
                <span>Goto page#:&nbdp;</span>
                <input className="pagination-goto-input"
                       type="text"
                       style={styles.paginationGoToInput}
                       onKeyPress={this.handleChangePageKeyPress}
                       value={page + 1}
                       disabled={isLoading}
                />
              </label>
            </div> :
            null
        }
      </div>
    );
  }
}

export default TableGate;
