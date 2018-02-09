import React, { Component } from 'react';
import debounce from 'lodash-es/debounce';

import './style.scss';

const INPUT_CHANGE_DEBOUNCE = 500;

class Search extends Component {
  handleChangeDebounce = debounce(event => this.props.onChange(event.target.value), INPUT_CHANGE_DEBOUNCE);

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleChangeDebounce} />
      </div>
    );
  }
}

export default Search;
