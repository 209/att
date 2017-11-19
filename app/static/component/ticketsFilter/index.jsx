import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clone from 'lodash-es/clone';
import range from 'lodash-es/range';
import { MAX_COUNT_STOPS } from 'constants/index';
import Filter from './filter';
import './style.scss';

class TicketsFilter extends Component {
  static propTypes = {
    filters:             PropTypes.array,
    filter:              PropTypes.array,
    changeTicketsFilter: PropTypes.func,
  };

  handleToggleFilter = (value, stops, force = false) => {
    let filter;

    if (stops === -1) {
      filter = range(0, MAX_COUNT_STOPS, 0).map(() => true);
    } else if (force) {
      filter = range(0, MAX_COUNT_STOPS, 0).map(item => !!item);
      filter[stops] = true;
    } else {
      filter = clone(this.props.filter);
      filter[stops] = value;
    }


    this.props.changeTicketsFilter(filter);
  };

  render() {
    const {
      filter,
      filters,
    } = this.props;

    const isAllChecked = filter.reduce((memo, item) => {
      memo = item && item;
      return memo;
    }, true);

    return (
      <div className="tickets-filter">
        <header>Количество пересадок</header>
        <footer>
          <Filter count={1}
                  stops={-1}
                  countText="Все"
                  checked={isAllChecked}
                  handleToggle={this.handleToggleFilter}
                  isOnlyEnable={false}
          />
          {filters.map((count, stops) => {
            const key = `${stops}-${count}`;
            const checked = filter[stops];
            const countText = stops === 1 ? 'Без пресадок' : `${stops} пересадок`;

            return (
              <Filter count={count}
                      stops={stops}
                      countText={countText}
                      key={key}
                      checked={checked}
                      handleToggle={this.handleToggleFilter}
              />
            );
          })}
        </footer>
      </div>
    );
  }
}

export default TicketsFilter;
