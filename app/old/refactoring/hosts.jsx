import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import Header from 'common/dashboard_header';
import Sidebar from 'common/sidebar';
import Footer from 'common/footer';

import router from 'global/router';

import { Navigation } from 'react-router';
import { DateRange } from 'react-date-range';
import { MultipleSwitchGroup } from 'common/switch';
import { auto_color } from 'common/utils';


let self;

Date.prototype.to_str = function () {
  return `${this.getUTCFullYear()}-${((this.getUTCMonth() + 1) < 10) ? '0' : ''}${this.getUTCMonth() + 1}-${(this.getUTCDate() < 10) ? '0' : ''}${this.getUTCDate()}`;
};

const Body = React.createClass({
  mixins: [Navigation],
  getInitialState() {
    let now = new Date();
    const from = new Date(now - 1000 * 3600 * 24 * 10);
    now = new Date(now - 1000 * 3600 * 24);
    this.dTable = null;
    self = this;
    return {
      timeframe:               {
        text: 'Last 10 days',
        from: from.to_str(), // string objects
        to:   now.to_str(),
      },
      hosts:                   {
        // 'WEB': (window.localStorage.getItem('hosts_show_WEB') || 'true') == 'true',
        // 'iPhone': (window.localStorage.getItem('hosts_show_iPhone') || 'false') == 'true',
        // 'iPad': (window.localStorage.getItem('hosts_show_iPad') || 'false') == 'true',
        // 'Android': (window.localStorage.getItem('hosts_show_Android') || 'false') == 'true',
        // 'Mobile Web': (window.localStorage.getItem('hosts_show_Mobile Web') || 'true') == 'true',
        // 'White Label': (window.localStorage.getItem('hosts_show_White Label') || 'true') == 'true'
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
      is_loading:              false,
      chart_error:             false,
      chart_loading:           true,
      loaded:                  false,
      show_datepicker:         false,
      highlight_update_button: false,
      default_ranges:          {
        Today: {
          startDate: function startDate(now) {
            return now.startOf('day');
          },
          endDate:   function endDate(now) {
            return now.startOf('day');
          },
        },

        'This Week': {
          startDate: function startDate(now) {
            return now.startOf('isoWeek');
          },
          endDate:   function endDate(now) {
            return now.startOf('day');
          },
        },

        'This Month': {
          startDate: function startDate(now) {
            return now.startOf('month');
          },
          endDate:   function endDate(now) {
            return now.startOf('day');
          },
        },

        'This Year': {
          startDate: function startDate(now) {
            return now.startOf('year');
          },
          endDate:   function endDate(now) {
            return now.startOf('day');
          },
        },

        Yesterday: {
          startDate: function startDate(now) {
            return now.startOf('day').add(-1, 'days');
          },
          endDate:   function endDate(now) {
            return now.startOf('day').add(-1, 'days');
          },
        },

        'Last Week': {
          startDate: function startDate(now) {
            return now.startOf('isoWeek').add(-7, 'days');
          },
          endDate:   function endDate(now) {
            return now.startOf('isoWeek').add(-1, 'days');
          },
        },

        'Last Month': {
          startDate: function startDate(now) {
            return now.startOf('month').add(-1, 'months');
          },
          endDate:   function endDate(now) {
            return now.startOf('month').add(-1, 'days');
          },
        },

        'Last Year': {
          startDate: function startDate(now) {
            return now.startOf('year').add(-1, 'years');
          },
          endDate:   function endDate(now) {
            return now.startOf('year').add(-1, 'days');
          },
        },
      },
    };
  },
  componentDidMount() {
    const token = window.localStorage.getItem('token');
    if (token == null) {
      window.location = '/login';
    } else {
      window.setTimeout(() => {
        self.updateTable(self.state.interval);
        self.updateChart();
        self.setState({
          is_loading:              true,
          highlight_update_button: false,
        });
      }, 1000);
    }
  },
  changeFrom(e) {
    this.setState({
      timeframe: {
        from: e.target.value,
        to:   this.state.timeframe.to,
      },
    });
  },
  changeTo(e) {
    this.setState({
      timeframe: {
        to:   e.target.value,
        from: this.state.timeframe.from,
      },
    });
  },
  updateTable() {
    const data = {
      from:    self.state.timeframe.from,
      to:      self.state.timeframe.to,
      gate_id: superuser_gate_id,
    };
    this.dTable = $('#gate-hosts-table')
      .addClass('nowrap')
      .DataTable({
        destroy:       true,
        serverSide:    true,
        responsive:    true,
        lengthChange:  true,
        searching:     false,
        info:          true,
        ordering:      false,
        // deferRender: true,
        scrollX:       '100%',
        fixedColumns:  {
          leftColumns: 1,
        },
        columns:       [
          { data: 'date' },
          { data: 'search_aviasales_searches' },
          { data: 'search_aviasales_clicks' },
          { data: 'search_aviasales_bc' },
          { data: 'search_aviasales_cbc' },
          { data: 'search_aviasales_pbc' },
          { data: 'search_aviasales_btr' },
          { data: 'search_aviasales_str' },
          { data: 'search_aviasales_cpc' },
          { data: 'iphone_aviasales_searches' },
          { data: 'iphone_aviasales_clicks' },
          { data: 'iphone_aviasales_bc' },
          { data: 'iphone_aviasales_cbc' },
          { data: 'iphone_aviasales_pbc' },
          { data: 'iphone_aviasales_btr' },
          { data: 'iphone_aviasales_str' },
          { data: 'iphone_aviasales_cpc' },
          { data: 'ipad_aviasales_searches' },
          { data: 'ipad_aviasales_clicks' },
          { data: 'ipad_aviasales_bc' },
          { data: 'ipad_aviasales_cbc' },
          { data: 'ipad_aviasales_pbc' },
          { data: 'ipad_aviasales_btr' },
          { data: 'ipad_aviasales_str' },
          { data: 'ipad_aviasales_cpc' },
          { data: 'android_aviasales_searches' },
          { data: 'android_aviasales_clicks' },
          { data: 'android_aviasales_bc' },
          { data: 'android_aviasales_cbc' },
          { data: 'android_aviasales_pbc' },
          { data: 'android_aviasales_btr' },
          { data: 'android_aviasales_str' },
          { data: 'android_aviasales_cpc' },
          { data: 'm_aviasales_searches' },
          { data: 'm_aviasales_clicks' },
          { data: 'm_aviasales_bc' },
          { data: 'm_aviasales_cbc' },
          { data: 'm_aviasales_pbc' },
          { data: 'm_aviasales_btr' },
          { data: 'm_aviasales_str' },
          { data: 'm_aviasales_cpc' },
          { data: 'wl_aviasales_searches' },
          { data: 'wl_aviasales_clicks' },
          { data: 'wl_aviasales_bc' },
          { data: 'wl_aviasales_cbc' },
          { data: 'wl_aviasales_pbc' },
          { data: 'wl_aviasales_btr' },
          { data: 'wl_aviasales_str' },
          { data: 'wl_aviasales_cpc' },
        ],
        stateSave:     true,
        rowCallback(row, data, index) {
          const columns = this.api().context[0].aoColumns;
          for (const i in columns) {
            if (data.hasOwnProperty(`${columns[i].data}_critical`) && data.hasOwnProperty(`${columns[i].data}_warning`)) {
              if (data[`${columns[i].data}_critical`] < data[`${columns[i].data}_warning`]) { // the less the worse
                if (data[columns[i].data] <= data[`${columns[i].data}_critical`]) {
                  $(`td:eq(${i.toString()})`, row).addClass('critical');
                }
              } else if (data[columns[i].data] >= data[`${columns[i].data}_critical`]) {
                $(`td:eq(${i.toString()})`, row).addClass('critical');
              }
            }
            if (columns[i].data.match(/(_btr|_str|_cpc)/)) {
              $(`td:eq(${i.toString()})`, row).html(data[columns[i].data].toFixed(2)); // BTR, STR, CPC are floats and should be rounded
            }
          }
        },
        sServerMethod: 'POST',
        ajax:          {
          url:     `${SERVER_URL}/hosts`,
          data,
          timeout: 300000,
          beforeSend(request) {
            mamka('send_event', { name: 'hosts_resolution_change', meta: { data } });
            request.setRequestHeader('Authorization', `Bearer ${window.localStorage.getItem('token')}`);
            const current_height = $('#gate-hosts-table_wrapper').height();
            $('#gate-hosts-table_wrapper').css('height', `${current_height}px`);
            $('#gate-hosts-table_wrapper').append(`<div id="gate-hosts-table-loading" style="position:absolute;top:0;left:0;right:0;bottom:0;font-size:50px;text-transform:uppercase;text-align:center;background-color:rgba(255,255,255,0.8);padding-top:${Math.floor(current_height / 2 - 30)}px;">Loading...</div>`);
            $('#pagination-goto').hide();
          },
          complete(data) {
            $('#gate-hosts-table-loading').remove();
            $('#gate-hosts-table_wrapper').css('height', 'inherit');
            self.setState({
              loaded:     true,
              is_loading: false,
            });
            // self.updateColumnVisibility(self.state.hosts, self.state.columns);
          },
          error(jqXHR, textStatus, errorThrown) {
            (new Image()).src = `//metrics.aviasales.ru/?goal=BACKOFFICE_FAILED_REQUEST_HOSTS&rand=${Math.random()}`;
            $('#gate-hosts-table-loading').html('Error');
            try {
              if (JSON.parse(r.responseText).description == 'Token is expired') {
                self.transitionTo('/login');
              } else {
                document.getElementById('chart-curtain').innerHTML = 'ERROR';
                Messenger({ extraClasses: 'messenger-fixed messenger-on-top messenger-on-right' }).post({
                  id:              'error',
                  type:            'error',
                  singleton:       false,
                  message:         'Oops! Error while loading table data. Try to reload the whole page.',
                  showCloseButton: true,
                  hideAfter:       5000,
                });
              }
            } catch (e) {
              document.getElementById('chart-curtain').innerHTML = 'ERROR';
              Messenger({ extraClasses: 'messenger-fixed messenger-on-top messenger-on-right' }).post({
                id:              'error',
                type:            'error',
                singleton:       false,
                message:         'Oops! Error while loading table data. Try to reload the whole page.',
                showCloseButton: true,
                hideAfter:       5000,
              });
            }
          },
        },
        drawCallback(settings) {
          $('#pagination-goto-input')[0].disabled = false;
          $('#pagination-overlay-loading').hide();
          $('#pagination-goto').show();
          $('#pagination-goto-input').val(self.dTable.page() + 1);
        },
      }).page(0);
    this.setState({
      show_datepicker:         false,
      highlight_update_button: false,
      is_loading:              true,
    });
  },
  updateChart() {
    this.setState({ chart_error: false, chart_loading: true });
    document.getElementById('chart-curtain').innerHTML = 'LOADING CHART...';
    const data = {
      from:    this.state.timeframe.from,
      to:      this.state.timeframe.to,
      gate_id: superuser_gate_id,
    };
    $.ajax({
      url:      `${SERVER_URL}/hosts`,
      data,
      dataType: 'json',
      type:     'POST',
      timeout:  300000, // 5 minutes
      beforeSend(request) {
        mamka('send_event', { name: 'hosts_resolution_change', meta: { data } });
        request.setRequestHeader('Authorization', `Bearer ${window.localStorage.getItem('token')}`);
      },
      success(data) {
        if (data.data) {
          data.data = data.data.reverse();
          const graphs = [];
          const hosts = {
            search_aviasales:  'web',
            iphone_aviasales:  'iPhone',
            ipad_aviasales:    'iPad',
            android_aviasales: 'Android',
            m_aviasales:       'mobile',
            wl_aviasales:      'Other',
          };
          let i = 0;
          for (const host in hosts) {
            graphs.push({
              valueAxis:                   'percent',
              id:                          `${host}_str`,
              bullet:                      'round',
              bulletBorderAlpha:           1,
              bulletColor:                 auto_color(6, i),
              bulletSize:                  5,
              hideBulletsCount:            50,
              lineThickness:               2,
              title:                       `STR: ${hosts[host]}`,
              useLineColorForBulletBorder: true,
              valueField:                  `${host}_str`,
              lineColor:                   auto_color(6, i),
            });
            i += 1;
          }
          console.debug(data.data);
          const chart = AmCharts.makeChart('line-chart', {
            type:           'serial',
            theme:          'none',
            pathToImages:   '//www.amcharts.com/lib/3/images/',
            dataDateFormat: 'YYYY-MM-DD',
            legend:         {
              useGraphSettings: true,
              align:            'center',
              valueWidth:       90,
            },
            valueAxes:      [{
              id:        'percent',
              axisAlpha: 0,
              position:  'right',
            }],
            graphs,
            chartScrollbar: {
              graph:           'search_aviasales_str',
              scrollbarHeight: 30,
            },
            chartCursor:    {
              categoryBalloonDateFormat: 'MMM DD',
              cursorPosition:            'mouse',
              pan:                       true,
              valueLineEnabled:          false,
              valueLineBalloonEnabled:   true,
            },
            categoryField:  'date',
            categoryAxis:   {
              parseDates:       true,
              dashLength:       1,
              minorGridEnabled: true,
              position:         'top',
              minPeriod:        'DD',
            },
            dataProvider:   data.data,
          });
          self.setState({
            chart_error: false, chart_loading: false, is_loading: false, loaded: true,
          });
        } else {
          self.setState({ chart_error: true, chart_loading: false });
          Messenger({ extraClasses: 'messenger-fixed messenger-on-top messenger-on-right' }).post({
            id:              'error',
            type:            'error',
            singleton:       false,
            message:         'Oops! Error while loading chart. Try to reload the whole page.',
            showCloseButton: true,
            hideAfter:       5000,
          });
        }
      },
      error(jqXHR, textStatus, errorThrown) {
        (new Image()).src = `//metrics.aviasales.ru/?goal=BACKOFFICE_FAILED_REQUEST_HOSTS&rand=${Math.random()}`;
        try {
          if (JSON.parse(jqXHR.responseText).description == 'Token is expired') {
            self.transitionTo('/login');
          } else {
            self.setState({ chart_error: true });
            Messenger({ extraClasses: 'messenger-fixed messenger-on-top messenger-on-right' }).post({
              id:              'error',
              type:            'error',
              singleton:       false,
              message:         'Oops! Error while loading chart data. Try to reload the whole page.',
              showCloseButton: true,
              hideAfter:       10000000000,
            });
          }
        } catch (e) {
          self.setState({ chart_error: true });
          Messenger({ extraClasses: 'messenger-fixed messenger-on-top messenger-on-right' }).post({
            id:              'error',
            type:            'error',
            singleton:       false,
            message:         'Oops! Error while loading chart data. Try to reload the whole page.',
            showCloseButton: true,
            hideAfter:       10000000000,
          });
        }
      },
    });
  },
  updateTableAndChart(interval, metrics, from, to, compare) {
    this.updateTable(interval);
    this.updateChart();
  },
  requestReport() {
    const data = {
      from:         this.state.timeframe.from,
      to:           this.state.timeframe.to,
      order_report: true,
      gate_id:      superuser_gate_id,
    };
    $.ajax({
      url:      `${SERVER_URL}/hosts`,
      data,
      context:  {
        from: this.state.timeframe.from,
        to:   this.state.timeframe.to,
      },
      type:     'POST',
      dataType: 'json',
      timeout:  10000,
      beforeSend(request) {
        mamka('send_event', { name: 'hosts_resolution_change', meta: { data } });
        request.setRequestHeader('Authorization', `Bearer ${window.localStorage.getItem('token')}`);
      },
      success(data) {
        if (data.result == 'OK') {
          vex.dialog.alert('Your report is being prepared. You can see all prepared reports on <a target="_blank" href="/downloads">Downloads page</a>.');
        } else {
          vex.dialog.alert('Could not order report. Please try again.');
        }
      },
      error(jqXHR, textStatus, errorThrown) {
        (new Image()).src = `//metrics.aviasales.ru/?goal=BACKOFFICE_FAILED_REQUEST_HOSTS_ORDER_REPORT&rand=${Math.random()}`;
        try {
          if (JSON.parse(r.responseText).description == 'Token is expired') {
            self.transitionTo('/login');
          } else {
            vex.dialog.alert('Could not order report. Please try again.');
          }
        } catch (e) {
          vex.dialog.alert('Could not order report. Please try again.');
        }
      },
    });
  },
  changePageKeyPress(event) {
    if (event.key === 'Enter') {
      const target_page = parseInt(event.target.value) - 1;
      if (isNaN(target_page) || (target_page < 0)) {
        vex.dialog.alert('Wrong page number!');
      } else {
        this.dTable.page(target_page).draw(false);
        $('#pagination-goto-input')[0].disabled = true;
        // $('#pagination-overlay-loading').show();
        // $('#pagination-goto').hide();
      }
    }
  },
  hideCurtain() {
    this.setState({
      is_loading: false,
    });
  },
  getTextFromRange(range) {
    const default_ranges = this.state.default_ranges;
    let text = '';
    for (const title in default_ranges) {
      if ((default_ranges[title].startDate(moment()).isSame(range.startDate)) && (default_ranges[title].endDate(moment()).isSame(range.endDate))) {
        text = title;
        break;
      }
    }
    if (text == '') {
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
    return text;
  },
  rangeInit(range) {
    const text = this.getTextFromRange(range);
    this.setState({
      timeframe: {
        text,
        from: range.startDate.format('YYYY-MM-DD'),
        to:   range.endDate.format('YYYY-MM-DD'),
      },
    });
  },
  changeRange(range) {
    const text = this.getTextFromRange(range);
    this.setState({
      timeframe:               {
        text,
        from: range.startDate.format('YYYY-MM-DD'),
        to:   range.endDate.format('YYYY-MM-DD'),
      },
      highlight_update_button: true,
    });
  },
  showDatePicker() {
    if (this.state.show_datepicker) {
      this.setState({ show_datepicker: false });
    } else {
      this.setState({ show_datepicker: true });
    }
  },
  hideDatePicker() {
    this.setState({
      show_datepicker: false,
    });
  },
  switchHost(host) {
    const hosts = this.state.hosts;
    hosts[host] = !hosts[host];
    this.setState({
      hosts,
    });
    // this.updateColumnVisibility(hosts, this.state.columns);
  },
  updateColumnVisibility(hosts, columns) {
    let i = 0;
    for (var host in hosts) {
      let j = 0;
      for (const key in columns) {
        try {
          this.dTable.column(1 + i * 8 + j).visible(hosts[host] * columns[key]); // may raise TypeError due to dataTables bug
        } catch (e) {
        }
        j++;
      }
      i++;
    }
    const td_content = $('tr.group td:nth-child(2)')[0].outerHTML;
    let group_row = '<td></td>';
    for (var host in hosts) {
      if ((host != '[object Object]') && hosts[host]) { // dirty bug fix
        group_row += td_content;
      }
    }
    $('tr.group').html(group_row);
  },
  render() {
    const chart_loading = this.state.chart_loading;
    const chart_error = this.state.chart_error;
    const timeframe = this.state.timeframe;
    const is_loading = this.state.is_loading;
    const loaded = this.state.loaded;
    const default_ranges = this.state.default_ranges;
    const hosts = this.state.hosts;
    const hosts_options = {
      WEB:          'WEB',
      iPhone:       'iPhone',
      iPad:         'iPad',
      Android:      'Android',
      'Mobile Web': 'Mobile Web',
      Other:        'Other',
    };
    const styles = {
      containerStyle:          {
        backgroundColor: (is_loading) ? '#ccc' : '#fff',
        paddingBottom:   0,
      },
      titleRowStyle:           {
        backgroundColor:  '#1ba6d2',
        color:            'white',
        height:           (true || is_loading || loaded) ? 2 : 50,
        WebkitTransition: 'height 1s',
        transition:       'height 1s',
      },
      titleStyle:              {
        textAlign:           'center',
        marginTop:           12,
        WebkitFontSmoothing: window.devicePixelRatio > 1 ? 'antialiased' : 'inherit',
        fontSize:            (true || is_loading || loaded) ? 0 : 36,
        WebkitTransition:    'font-size 1s',
        transition:          'font-size 1s',
      },
      headerRowStyle:          { backgroundColor: '#1ba6d2', color: 'white', height: 40 },
      maxWidthCenteredStyle:   { width: '100%', textAlign: 'center', padding: '0 0 5px 0' },
      controlWrapStyle:        {
        height:   40,
        width:    200,
        overflow: 'visible',
        position: 'relative',
        display:  'inline-block',
        margin:   '0 10px 0 10px',
      },
      rangeStyle:              {
        position:         'absolute',
        top:              2,
        left:             0,
        right:            0,
        border:           'none',
        backgroundColor:  'transparent',
        color:            '#fff',
        fontSize:         12,
        letterSpacing:    1,
        textTransform:    'uppercase',
        fontWeight:       400,
        textAlign:        'center',
        textOverflow:     'ellipsis',
        cursor:           'pointer',
        WebkitTransition: 'all .2s',
        transition:       'all .2s',
      },
      labelStyle:              {
        fontSize:            10,
        textAlign:           'center',
        bottom:              2,
        left:                0,
        right:               0,
        position:            'absolute',
        color:               '#fff',
        WebkitFontSmoothing: window.devicePixelRatio > 1 ? 'antialiased' : 'inherit',
      },
      buttonStyle:             {
        height:          30,
        width:           120,
        borderTop:       '1px solid #faa760',
        borderRight:     '1px solid #e16800',
        borderBottom:    '1px solid #e16800',
        borderLeft:      0,
        fontSize:        17,
        lineHeight:      '17px',
        margin:          0,
        borderRadius:    3,
        position:        'absolute',
        left:            0,
        top:             5,
        backgroundColor: '#fd8a27',
        color:           '#fff',
        outline:         'none',
        cursor:          'pointer',
        opacity:         1,
        animation:       this.state.highlight_update_button ? 'pulse 1s infinite' : is_loading ? 'pulse 0.5s infinite' : 'none',
        zIndex:          99999,
      },
      downloadButtonStyle:     {
        height:          20,
        width:           140,
        border:          '1px solid #ffffff',
        fontSize:        12,
        lineHeight:      '12px',
        margin:          0,
        borderRadius:    3,
        position:        'absolute',
        right:           0,
        top:             10,
        backgroundColor: 'transparent',
        color:           '#ffffff',
        outline:         'none',
        cursor:          'pointer',
        opacity:         0.9,
        textAlign:       'center',
      },
      bigLoadingStyle:         {
        position:        'absolute',
        top:             67,
        left:            0,
        right:           0,
        bottom:          0,
        zIndex:          10000,
        display:         (this.state.is_loading || !this.state.loaded) ? 'block' : 'none',
        backgroundColor: '#ccc',
      },
      bigLoadingHeadlineStyle: {
        position:            'absolute',
        top:                 '50%',
        left:                0,
        right:               0,
        WebkitTransform:     'translateY(-50%)',
        transform:           'translateY(-50%)',
        fontSize:            50,
        WebkitFontSmoothing: window.devicePixelRatio > 1 ? 'antialiased' : 'inherit',
        textAlign:           'center',
        color:               '#f0f0f0',
        textTransform:       'uppercase',
        margin:              '0',
      },
    };
    return (
      <Container id="body" style={styles.containerStyle}>
        <Row style={styles.titleRowStyle}>
          <h1 style={styles.titleStyle}>
            BY HOSTS
          </h1>
        </Row>
        <Row style={styles.headerRowStyle}>
          <div style={styles.maxWidthCenteredStyle}>
            <h1 style={{
              position: 'absolute', left: 30, top: 15, textTransform: 'uppercase', fontSize: 17,
            }}
                className="visible-lg visible-md"
            >By hosts
            </h1>
            <div style={styles.controlWrapStyle}>
              <div style={styles.rangeStyle} onClick={this.showDatePicker}>{timeframe.text}</div>
              <DateRange
                onInit={this.rangeInit}
                onChange={this.changeRange}
                linkedCalendars
                ranges={default_ranges}
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
                  visibility: this.state.show_datepicker ? 'visible' : 'hidden',
                  position:   'absolute',
                  top:        40,
                  width:      420,
                  zIndex:     100000,
                }}
              />
              <div style={{
                display:  this.state.show_datepicker ? 'block' : 'none',
                position: 'fixed',
                top:      0,
                left:     0,
                bottom:   0,
                right:    0,
                zIndex:   99998,
              }}
                   onClick={this.hideDatePicker}
              />
              <span style={styles.labelStyle}>Timeframe</span>
            </div>
            <div style={{
              display: 'inline-block', position: 'relative', width: 200, height: 40,
            }}
            >
              <Button onClick={this.updateTableAndChart}
                      style={styles.buttonStyle}
                      className="button"
                      disabled={is_loading}
              >
                {is_loading ? 'Loading...' : 'Update'}
              </Button>
            </div>
            <div style={{
              display: 'inline-block', float: 'right', position: 'relative', height: 40, marginRight: 40,
            }}
            >
              <Button onClick={this.requestReport} style={styles.downloadButtonStyle} className="download-button">
                Download CSV
              </Button>
            </div>
          </div>
        </Row>
        <Row id="curtain" onClick={this.hideCurtain} style={styles.bigLoadingStyle}>
          <h1 style={styles.bigLoadingHeadlineStyle}>
            {'Loading...'}
          </h1>
        </Row>
        <Row style={{ visibility: loaded ? 'visible' : 'hidden' }}>
          <Col sm={12}>
            <div id="chart-curtain"
                 onClick={this.hideCurtain}
                 style={{
                   display:         chart_loading + chart_error ? 'block' : 'none',
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
                 }}
            >{chart_error ? 'ERROR' : 'LOADING...'}
            </div>
            <div id="line-chart" style={{ width: '100%', height: 500, padding: '0 30px' }} />
          </Col>
        </Row>
        <Row style={{ visibility: loaded ? 'visible' : 'hidden', position: 'relative', padding: '0 50px' }}>
          <Col sm={12}>
            <Table id="gate-hosts-table" className="display compact" cellSpacing="0" width="100%">
              <thead>
              <tr>
                <th rowSpan="2" style={{ textAlign: 'center', background: 'white', cursor: 'default' }}>Date</th>
                <th colSpan="8" style={{ textAlign: 'center', fontSize: 14 }}>WEB</th>
                <th colSpan="8" style={{ textAlign: 'center', fontSize: 14 }}>iPhone</th>
                <th colSpan="8" style={{ textAlign: 'center', fontSize: 14 }}>iPad</th>
                <th colSpan="8" style={{ textAlign: 'center', fontSize: 14 }}>Android</th>
                <th colSpan="8" style={{ textAlign: 'center', fontSize: 14 }}>Mobile Web</th>
                <th colSpan="8" style={{ textAlign: 'center', fontSize: 14 }}>Other</th>
              </tr>
              <tr>
                <th>Srchs</th>
                <th>Clicks</th>
                <th>BC</th>
                <th>CBC</th>
                <th>PBC</th>
                <th>BTR</th>
                <th>STR</th>
                <th>CPC</th>
                <th>Srchs</th>
                <th>Clicks</th>
                <th>BC</th>
                <th>CBC</th>
                <th>PBC</th>
                <th>BTR</th>
                <th>STR</th>
                <th>CPC</th>
                <th>Srchs</th>
                <th>Clicks</th>
                <th>BC</th>
                <th>CBC</th>
                <th>PBC</th>
                <th>BTR</th>
                <th>STR</th>
                <th>CPC</th>
                <th>Srchs</th>
                <th>Clicks</th>
                <th>BC</th>
                <th>CBC</th>
                <th>PBC</th>
                <th>BTR</th>
                <th>STR</th>
                <th>CPC</th>
                <th>Srchs</th>
                <th>Clicks</th>
                <th>BC</th>
                <th>CBC</th>
                <th>PBC</th>
                <th>BTR</th>
                <th>STR</th>
                <th>CPC</th>
                <th>Srchs</th>
                <th>Clicks</th>
                <th>BC</th>
                <th>CBC</th>
                <th>PBC</th>
                <th>BTR</th>
                <th>STR</th>
                <th>CPC</th>
              </tr>
              </thead>
              <tbody />
            </Table>
            <div id="pagination-overlay-loading"
                 style={{
                   display:     'none',
                   marginLeft:  'auto',
                   marginRight: 'auto',
                   position:    'relative',
                   top:         -34,
                   zIndex:      100,
                   fontSize:    14,
                 }}
            >
              Loading...
            </div>
            <div id="pagination-goto"
                 style={{
                   width:       160,
                   marginLeft:  'auto',
                   marginRight: 'auto',
                   position:    'relative',
                   top:         -40,
                   zIndex:      100,
                 }}
            >
              <Label style={{ fontSize: 14, display: 'inline-block', width: 200 }}>
                Goto page#:&nbsp;
                <Input id="pagination-goto-input"
                       type="text"
                       style={{ fontSize: 14, display: 'inline', width: 60 }}
                       onKeyPress={this.changePageKeyPress.bind(null)}
                />
              </Label>
            </div>
          </Col>
        </Row>
      </Container>
    );
  },
});

@SidebarMixin
export default class extends React.Component {
  render() {
    const classes = classNames({
      'container-open': this.props.open,
    });

    return (
      <Container id="container" className={classes}>
        <Header />
        <Sidebar open={this.props.open} />
        <Body />
        <Footer />
      </Container>
    );
  }
}
