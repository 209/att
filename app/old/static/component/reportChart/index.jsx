import React, { Component } from 'react';
import 'amcharts/dist/amcharts/amcharts';
import 'amcharts/dist/amcharts/serial';
import 'amcharts/dist/amcharts/themes/light';
import AmCharts from 'libs/amchartToReact';
import config from './config';

import './style.scss';

class Chart extends Component {
  render() {
    const conf = {
      ...config,
      dataProvider: this.props.statistics,
    };

    return (
      <div className="chart">
        <AmCharts.React style={{ width: '100%', height: '500px' }} options={conf} />
      </div>
    );
  }
}

export default Chart;
