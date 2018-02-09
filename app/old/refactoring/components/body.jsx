import React, { Component } from 'react';
import { Navigation } from 'react-router';
import vex from 'vex';
import { superuserGateId } from 'common/user';

import DateRange from './dateRange';
import TableGate from './reportTable';
import Chart from './Chart';

import { generateTableConfig } from './tableConfig';
import { dateToStrong } from '../utils/date';
import { requestPrepareReport } from '../api/report';

import Messenger from 'common/messenger';

@Navigation
class Body extends Component {
  constructor(props) {
    super(props);

    const now = new Date(new Date() - 1000 * 3600 * 24);
    const from = new Date(now - 1000 * 3600 * 24 * 10);

    this.state = {
      timeframe:               {
        text: 'Last 10 days',
        from: dateToStrong(from), // string objects
        to:   dateToStrong(now),
      },
      hosts:                   {
        WEB:          true,
        iPhone:       true,
        iPad:         true,
        Android:      true,
        'Mobile Web': true,
        Other:        true,
      },
      columns:                 { // columns should go in the same order as they appear in the table
        Srchs:  true,
        Clicks: true,
        BC:     true,
        CBC:    true,
        PBC:    true,
        BTR:    true,
        CPC:    true,
      },
      isLoading:               false,
      isLoaded:                false,
      isShowDatepicker:        false,
      isHighlightUpdateButton: false,
    };
  }

  handleChangeLoad = loadOptions => {
    //В этот метод пробросим параметры для loading
    //Но стейты нужно хранить в store

    this.setState({
      ...loadOptions,
    });
  };

  handleUpdateTableAndChart = () => {
    this.setState({
      isShowDatepicker:        false,
      isHighlightUpdateButton: false,
      isLoading:               true,
      isLoaded:                false,
    });
  };

  handleRequestPrepareReport = () => {
    const context = {
      from: this.state.timeframe.from,
      to:   this.state.timeframe.to,
    }
    const data = {
      ...context,
      order_report: true,
      gate_id:      superuserGateId,
    };

    requestPrepareReport(data, context)
      .resolve(data => {
        if (result === 'OK') {
          vex.dialog.alert('Your report is being prepared. ' +
            'You can see all prepared reports on ' +
            '<a target="_blank" href="/downloads">Downloads page</a>.');
        } else {
          vex.dialog.alert('Could not order report. Please try again.');
        }
      })
      .reject(error => vex.dialog.alert(error.message));
  };

  handleHideCurtain = () => this.setState({ isLoading: false });
  handleShowDataPicker = () => this.setState({ isShowDatepicker: this.state.isShowDatepicker });
  handleHideDatePicker = () => this.setState({ isShowDatepicker: false });
  handleInitTimeframe = timeframe => this.setState({ ...timeframe });
  handleChangeTimeframe = options => this.setState({ ...this.state.timeframe, isHighlightUpdateButton: true });

  render() {
    const {
      isLoading,
      isLoaded,
      isShowDatepicker,
      isHighlightUpdateButton,
      timeframe,
      hosts,
    } = this.state;

    const styles = generateTableConfig({
      isLoading,
      isLoaded,
      isHighlightUpdateButton,
      isShowDatepicker,
    });

    const MAGIC_NUMBER = 12;

    return (
      <Container id="body" style={styles.containerStyle}>
        <Row style={styles.titleRowStyle}>
          <h1 style={styles.titleStyle}>BY HOSTS</h1>
        </Row>
        <Row style={styles.headerRowStyle}>
          <div style={styles.maxWidthCenteredStyle}>
            <h1 style={styles.headerRowStyle.h1} className="visible-lg visible-md">By hosts</h1>
            <div style={styles.controlWrapStyle}>
              <div style={styles.rangeStyle} onClick={this.handleShowDataPicker}>{timeframe.text}</div>
              <DateRange
                isVisible={isShowDatepicker}
                timeframe={timeframe}
                handleInitTimeframe={this.handleInitTimeframe}
                handleChangeTimeframe={this.handleChangeTimeframe}
              />
              <div style={styles.hideDataPicker} onClick={this.handleHideDatePicker} />
              <span style={styles.labelStyle}>Timeframe</span>
            </div>
            <div style={styles.controlWrapStyle2}>
              <Button style={styles.buttonStyle} className="button" onClick={this.handleUpdateTableAndChart}
                      disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Update'}
              </Button>
            </div>
            <div style={styles.controlWrapStyle3}>
              <Button onClick={this.handleRequestPrepareReport} style={styles.downloadButtonStyle}
                      className="download-button">
                Download CSV
              </Button>
            </div>
          </div>
        </Row>
        <Row id="curtain" style={styles.bigLoadingStyle} onClick={this.handleHideCurtain}>
          <h1 style={styles.bigLoadingHeadlineStyle}>Loading...</h1>
        </Row>
        <Row style={styles.chartWrapper}>
          <Col sm={MAGIC_NUMBER}>
            <Chart />
          </Col>
        </Row>
        <Row style={styles.tableRow}>
          <Col sm={MAGIC_NUMBER}>
            <TableGate handleChangeLoad={this.handleChangeLoad}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Body;
