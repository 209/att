import jQuery from 'jquery';
import React, { Component } from 'react';
import { SERVER_URL } from '../constants';
import mamka from 'mamka';
import { transitionTo } from 'common/utils';
import Messenger from 'common/messenger';
import { superuserGateId } from 'common/user';


import { getOptionsChart } from './options';


class DateTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChartError:   false,
      isChartLoading: true,
    }
  }

  handleBeforeSend = request => {
    mamka('send_event', { name: 'hosts_resolution_change', meta: { data } });
    request.setRequestHeader('Authorization', `Bearer ${window.localStorage.getItem('token')}`);
  }

  loadingError() {
    this.setState({
      isChartError:   true,
      isChartLoading: false
    });

    Messenger({ extraClasses: 'messenger-fixed messenger-on-top messenger-on-right' }).post({
      id:              'error',
      type:            'error',
      singleton:       false,
      message:         'Oops! Error while loading chart. Try to reload the whole page.',
      showCloseButton: true,
      hideAfter:       5000,
    });

    document.getElementById('chart-curtain').innerHTML = 'ERROR';
  }

  handleSuccess = ({ rawData }) => {
    if (!rawData) {
      this.loadingError();
      return
    }

    const chart = AmCharts.makeChart('line-chart', {
      ...getOptionsChart(),
      dataProvider: data.reverse(),
    });

    this.setState({
      isChartError:   false,
      isChartLoading: false,
    });
  }

  handleError = (jqXHR, textStatus, errorThrown) => {
    (new Image()).src = `//metrics.aviasales.ru/?goal=BACKOFFICE_FAILED_REQUEST_HOSTS&rand=${Math.random()}`;

    const error = () => {
      this.loadingError()
    };

    try {
      if (JSON.parse(jqXHR.responseText).description === 'Token is expired') {
        transitionTo('/login');
      } else {
        error()
      }
    } catch (e) {
      error();
    }
  }

  componentDidMount() {
    document.getElementById('chart-curtain').innerHTML = 'LOADING CHART...';

    const data = {
      from:    this.state.timeframe.from,
      to:      this.state.timeframe.to,
      gate_id: superuserGateId,
    };

    jQuery.ajax({
      url:        `${SERVER_URL}/hosts`,
      data,
      dataType:   'json',
      type:       'POST',
      timeout:    300000, // 5 minutes
      beforeSend: this.handleBeforeSend,
      success:    this.handleSuccess,
      error:      this.handleError,
    });
  }

  render() {
    const {
      isChartError,
      isChartLoading,
    } = this.state;

    const styles = {
      chartCurtain:             {
        display:         isChartLoading + isChartError ? 'block' : 'none',
        position:        'absolute',
        top:             0,
        left:            0,
        right:           0,
        bottom:          0,
        zIndex:          100,
        backgroundColor: 'rgba(255,255,255,0.8)',
        fontSize:        40,
        lineHeight:      '550px',
        color:           '#BCF',
        textAlign:       'center',
      },
      lineChart: {
        width:   '100%',
        height:  500,
        padding: '0 30px',
      },
    };

    return (
      <div>
        <div id="chart-curtain" style={styles.chartCurtain}>
          {isChartError ? 'ERROR' : 'LOADING...'}
        </div>
        <div id="line-chart" style={styles.lineChart} />
      </div>
    );
  }
}

export default DateTable;
