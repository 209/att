import React, { Component } from 'react';
import User from '../user';
import Search from '../search';

import './style.scss';

//@todo: подключить бесконечный список
class Users extends Component {
  handleChangeTerm = term => {
    this.props.fetchUsers(term);
  };
  handleNextUsers = () => {
    this.props.nextUsers();
  };

  render() {
    const { users, term } = this.props;

    return (
      <div>
        <header>
          <Search term={term} onChange={this.handleChangeTerm}/>
        </header>
        <section>
          {
            users.map(user => <User user={user}/>)
          }
        </section>
        <footer>
          <button onClick={this.handleNextUsers}>next page</button>
        </footer>
      </div>
    );
  }
}

export default Users;
