import React from 'react';
import { connect } from 'react-redux';
import Users from 'component/users';
import { getUsers, getStatus, getTerm } from 'store/users/selectors';
import { fetchUsers, nextUsers } from 'store/users/actions';

const Container = connect(state => ({
  users:  getUsers(state),
  term:   getTerm(state),
  status: getStatus(state),
}), {
  fetchUsers,
  nextUsers,
})(Users);

export default Container;
