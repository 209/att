import React, { Component } from 'react';
import { ReactDateRange } from 'react-date-range';
import moment from 'moment';

class DateRange extends Component {
  getDefaultRanges() {
    const now = new Date(new Date() - 1000 * 3600 * 24);

    return [
      {
        title:     'Today',
        startDate: now => now.startOf('day'),
        endDate:   now => now.startOf('day'),
      },
      {
        title:     'This Week',
        startDate: now => now.startOf('isoWeek'),
        endDate:   now => now.startOf('day'),
      },
      {
        title:     'This Month'
        startDate: now => now.startOf('month'),
        endDate:   now => now.startOf('day'),
      },
      {
        title:     'This Year'
        startDate: now => now.startOf('year'),
        endDate:   now => now.startOf('day'),
      },
      {
        title:     'Yesterday'
        startDate: now => now.startOf('day').add(-1, 'days'),
        endDate:   now => now.startOf('day').add(-1, 'days'),
      },
      {
        title:     'Last Week'
        startDate: now => now.startOf('isoWeek').add(-7, 'days'),
        endDate:   now => now.startOf('isoWeek').add(-1, 'days'),
      },
      {
        title:     'Last Month'
        startDate: now => now.startOf('month').add(-1, 'months'),
        endDate:   now => now.startOf('month').add(-1, 'days'),
      },
      {
        title:     'Last Year'
        startDate: now => now.startOf('year').add(-1, 'years'),
        endDate:   now => now.startOf('year').add(-1, 'days'),
      },
    ];
  }

  getTextFromRange(range) {
    const defaultRanges = this.getDefaultRanges();
    const _range = filter(defaultRanges, item => {
      return item.startDate(moment()).isSame(range.startDate) && item.endDate(moment()).isSame(range.endDate);
    });

    if (_range) {
      return _range.title;
    } else {
      let text;

      if (moment().startOf('year').isSame(moment(range.startDate).startOf('year'))) {
        if (moment(range.startDate).startOf('day').isSame(moment(range.endDate).startOf('day'))) {
          text = range.startDate.format('D MMMM');
        }
        // interval is inside current year, so we don't have to show year
        else if (moment(range.startDate).startOf('month').isSame(moment(range.endDate).startOf('month'))) {
          // interval is inside a month, so we show it in 'Jan 10 - 23' format
          text = `${range.startDate.format('D')} - ${range.endDate.format('D MMMM')}`;
        } else {
          text = `${range.startDate.format('Do MMM')} - ${range.endDate.format('Do MMM')}`;
        }
      } else if (moment(range.startDate).startOf('day').isSame(moment(range.endDate).startOf('day'))) {
        text = range.startDate.format('D MMM YYYY');
      } else if (moment(range.startDate).startOf('month').isSame(moment(range.endDate).startOf('month'))) {
        // inside one month - show as 14 - 30 October 2015
        text = `${range.startDate.format('D')} - ${range.endDate.format('D MMMM YYYY')}`;
      } else {
        text = `${range.startDate.format('D MMM YYYY')} - ${range.endDate.format('D MMM YYYY')}`;
      }
    }
  }

  handleRangeInit = range => {
    this.props.handleInitTimeframe({
      text: this.getTextFromRange(range),
      from: range.startDate.format('YYYY-MM-DD'),
      to:   range.endDate.format('YYYY-MM-DD'),
    });
  }

  handleChangeRange = range => {
    this.props.handleChangeTimeframe({
      text: this.getTextFromRange(range),
      from: range.startDate.format('YYYY-MM-DD'),
      to:   range.endDate.format('YYYY-MM-DD'),
    });
  }

  render() {
    const {
      isVisible,
      timeframe,
    } = this.props;

    return (
      <ReactDateRange
        onInit={this.handleRangeInit}
        onChange={this.handleChangeRange}
        linkedCalendars
        ranges={this.getDefaultRanges()}
        startDate={timeframe.from}
        endDate={timeframe.to}
        format="YYYY-MM-DD"
        firstDayOfWeek={1}
        theme={{
          Calendar:            { width: 200 },
          MonthButton:         { background: '#1ba6d2' },
          MonthArrowPrev:      { borderRightColor: '#ffffff' },
          MonthArrowNext:      { borderLeftColor: '#ffffff' },
          PredefinedRanges:    { margin: 0, width: 400 },
          PredefinedRangeItem: {
            display:    'inline-block',
            width:      80,
            margin:     2,
            padding:    5,
            cursor:     'pointer',
            background: '#1ba6d2',
            color:      '#ffffff',
          },
        }}
        style={{
          visibility: isVisible ? 'visible' : 'hidden',
          position:   'absolute',
          top:        40,
          width:      420,
          zIndex:     100000,
        }}
      />
    );
  }
}

export default DateRange;
