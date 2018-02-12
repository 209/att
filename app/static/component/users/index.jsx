import React, { Component } from 'react';
import Infinite from 'react-infinite';
import User from '../user';
import Search from '../search';

import './style.scss';

class Users extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  };

  handleChangeTerm = term => {
    this.props.fetchUsers(term);
  };
  handleNextUsers = () => {
    this.props.nextUsers();
  };

  render() {
    const { users, term } = this.props;

    return (
      <div className="users">
        <header>
          <Search term={term} onChange={this.handleChangeTerm}/>
        </header>
        <section>
          <Infinite containerHeight={500} elementHeight={50}>
            {
              users.map(user => <User user={user} key={user.id}/>)
            }
          </Infinite>
        </section>
        <footer>
          <button onClick={this.handleNextUsers}>next page</button>
        </footer>
      </div>
    );
  }
}

export default Users;
