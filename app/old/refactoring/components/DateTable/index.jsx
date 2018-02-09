import jQuery from 'jquery';
import React, { Component } from 'react';
import { SERVER_URL } from '../constants';
import mamka from 'mamka';
import { transitionTo } from 'common/utils';
import Messenger from 'common/messenger';

class DateTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selector: `.data-table-react-wrapper__${props.suffix}`
    }
  }

  componentDidMount() {
    const {
      handleRowCallback,
      error,
      data,
      tableColumns,
    } = this.props;

    const { selector } = this.state;

    this.dTable = jQuery(selector)
      .addClass('nowrap')
      .DataTable({
        destroy:       true,
        serverSide:    true,
        responsive:    true,
        lengthChange:  true,
        searching:     false,
        info:          true,
        ordering:      false,
        scrollX:       '100%',
        fixedColumns:  {
          leftColumns: 1,
        },
        columns:       tableColumns,
        stateSave:     true,
        sServerMethod: 'POST',
        ajax:          {
          url:        `${SERVER_URL}/hosts`,
          timeout:    300000,
          beforeSend: this.handleBeforeSend,
          complete:   this.handleComplete,
          error:      this.handleError,
          data,
        },
        drawCallback:  this.handleDrawCallback,
        rowCallback:   handleRowCallback,
      })
      .page(this.props.page);
  }

  handleDrawCallback = () => {
    this.setState({
      isLoading: false,
      isLoaded:  true,
    });
  }

  handleBeforeSend = request => {
    mamka('send_event', { name: 'hosts_resolution_change', meta: { data } });
    request.setRequestHeader('Authorization', `Bearer ${window.localStorage.getItem('token')}`);

    this.setState({
      isLoading: true,
      isLoaded:  false,
    });

    this.props.handleBeforeSend();
  };

  handleComplete = () => {
    this.props.handleComplete();
  }

  handleError = jqXHR => {
    (new Image()).src = `//metrics.aviasales.ru/?goal=BACKOFFICE_FAILED_REQUEST_HOSTS&rand=${Math.random()}`;

    const error = () => {
      this.setState({
        isLoading: false,
        isLoaded:  false,
        isError:   true,
      });

      this.props.handleError();

      Messenger({ extraClasses: 'messenger-fixed messenger-on-top messenger-on-right' })
        .post({
          id:              'error',
          type:            'error',
          singleton:       false,
          message:         'Oops! Error while loading table data. Try to reload the whole page.',
          showCloseButton: true,
          hideAfter:       5000,
        });
    }

    try {
      if (JSON.parse(jqXHR.responseText).description === 'Token is expired') {
        transitionTo('/login');
      } else {
        error()
      }
    } catch (e) {
      error();
    }
  };

  render() {
    const {
      selector,
      isLoading,
      isError,
    } = this.state;

    return (
      <div className="table_wrapper">
        {isLoading ? <div className="table-loading">Loading...</div> : null}
        {isError ? <div className="table-loading">Error</div> : null}
        <table className={`${selector} display compact`} cellSpacing="0" width="100%">
          {props.children}
        </table>
      </div>
    );
  }
}

export default DateTable;
