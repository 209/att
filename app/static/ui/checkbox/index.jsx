import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CheckboxEnabled from 'ui/icons/checkboxEnabled';
import CheckboxDisabled from 'ui/icons/checkboxDisabled';
import './style.scss';

// @todo this ui component only for presentation
class Checkbox extends PureComponent {
  static propTypes = {
    enabled: PropTypes.bool,
    checked: PropTypes.bool,
    onClick: PropTypes.func,
  };
  static defaultProps = {
    enabled: true,
    checked: false,
    onClick: () => {},
  };

  handleClick = event => {
    if (!this.props.enabled) {
      event.stopPropagation();
      return;
    }
    this.props.onClick(!this.props.enabled);
  };

  render() {
    const { enabled, checked } = this.props;

    let className = 'ui-checkbox';
    if (!enabled) {
      className += ' -disabled';
    }

    return (
      <span className={className}>
        {
          checked ?
            <CheckboxEnabled onClick={this.handleClick} /> :
            <CheckboxDisabled onClick={this.handleClick} />
        }
      </span>
    );
  }
}

export default Checkbox;
