import React, { Component } from 'react';
import debounce from 'lodash-es/debounce';

import './style.scss';

const INPUT_CHANGE_DEBOUNCE = 500;

class Search extends Component {
  handleChange = event => this.handleChangeDebounce(event.target.value);
  handleChangeDebounce = debounce(value => this.props.onChange(value), INPUT_CHANGE_DEBOUNCE);

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleChange}/>
      </div>
    );
  }
}

export default Search;
