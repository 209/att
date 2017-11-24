import React, { Component } from 'react';
import './style.scss';

class GoTo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: props.page,
    };
  }

  handleKeyPress = event => {
    if (event.charCode !== 13) {
      return;
    }

    this.handleApply();
  };

  handleApply = () => {
    const {
      totalPages,
    } = this.props;
    let {
      page,
    } = this.state;

    if (page < 1) {
      page = 1;
    } else if (page > totalPages) {
      page = totalPages;
    }

    this.props.handleChangePage(page);
  };

  handleChangeInput = event => {
    this.setState({
      page: event.target.value,
    });
  };

  render() {
    const { page } = this.state;

    return (
      <span className="report-goto">
        <span className="report-goto-label">Goto page#:</span>
        <input type="text"
               value={page}
               onKeyPress={this.handleKeyPress}
               onChange={this.handleChangeInput}
               onBlur={this.handleApply}
               className="report-goto-input"
        />
      </span>
    );
  }
}

export default GoTo;
