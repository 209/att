import React, { Component } from 'react';
import './style.scss';

class GoTo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: props.page,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      page: nextProps.page,
    });
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
    const {
      page,
    } = this.state;

    let pageNum = parseInt(page, 10);

    if (Number.isNaN(pageNum)) {
      pageNum = this.props.page;
      this.setState({
        page: this.props.page,
      });
    } else if (pageNum < 1) {
      pageNum = 1;
    } else if (pageNum > totalPages) {
      pageNum = totalPages;
    }

    this.props.handleChangePage(pageNum);
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
