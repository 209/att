import React, { Component } from 'react';
import './style.scss';

class GoTo extends Component {
  handleKeyPress = event => {
    if (event.target.code !== 13) {
      return;
    }

    this.props.handleChangePage(event.target.value);
  };

  render() {
    const {
      page,
    } = this.props;

    const handleChangeInput = () => {};

    return (
      <span className="report-goto">
        <span className="report-goto-label">Goto page#:</span>
        <input type="text"
               value={page}
               onKeyPress={this.handleKeyPress}
               onChange={handleChangeInput}
               className="report-goto-input"
        />
      </span>
    );
  }
}

export default GoTo;
