import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'ui/checkbox';

class Filter extends Component {
  static propTypes = {
    handleToggle: PropTypes.func,
    checked:      PropTypes.bool,
    stops:        PropTypes.number,
    count:        PropTypes.number,
    isOnlyEnable: PropTypes.bool,
  };

  static defaultProps = {
    isOnlyEnable: true,
  };

  handleToggle = () => this.props.handleToggle(!this.props.checked, this.props.stops);
  handleToggleForce = event => {
    event.stopPropagation();

    this.props.handleToggle(!this.props.checked, this.props.stops, true);
  };

  render() {
    const {
      count,
      checked,
      countText,
      isOnlyEnable,
    } = this.props;

    let className = 'tickets-filter-item';
    if (!count) {
      className += ' -disabled';
    }

    return (
      <div className={className} onClick={this.handleToggle} onKeyPress={this.handleToggle}>
        <Checkbox checked={checked} disabled={!count} />
        <span className="count-label">
          <span className="count">{countText}</span>
          {
            isOnlyEnable ?
              (
                <span className="apply-only"
                      onClick={this.handleToggleForce}
                      onKeyPress={this.handleToggleForce}
                >Только
                </span>
              ) :
              null
          }
        </span>
      </div>
    );
  }
}

export default Filter;
