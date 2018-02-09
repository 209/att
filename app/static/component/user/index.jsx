import React, { Component } from 'react';

import './style.scss';

class Users extends Component {
  render() {
    const {
      name,
      avatar,
    } = this.props.user;

    return (
      <div>
        {`User: ${name}`}
      </div>
    );
  }
}

export default Users;
