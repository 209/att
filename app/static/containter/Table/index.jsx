import React from 'react';
import { connect } from 'react-redux';
import Table from '../../component/table';
import { getPockemones } from '../../store/pokemon/selectors';
import { fetchPockemones } from '../../store/pokemon/actions';

const Container = connect(state => ({
  pockemones: getPockemones(state),
}), {
  fetchPockemones,
})(Table);

export default Container;
