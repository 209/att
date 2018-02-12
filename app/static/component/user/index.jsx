import React, { Component } from 'react';

import './style.scss';

class Users extends Component {
  render() {
    const {
      name,
      avatar,
    } = this.props.user;

    return (
      <div className="users-item">
        <span><img src="static/img/1.png" /></span>
        <span>{`${name}`}</span>
      </div>
    );
  }
}

export default Users;
