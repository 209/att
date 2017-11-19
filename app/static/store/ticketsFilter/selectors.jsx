import { getTickets } from 'store/ticketsList/selectors';
import groupBy from 'lodash-es/groupBy';
import range from 'lodash-es/range';
import isArray from 'lodash-es/isArray';
import { MAX_COUNT_STOPS } from 'constants/index';

export const getFilters = state => {
  const tickets = getTickets(state);
  const ticketsGroup = groupBy(tickets, ticket => ticket.stops);

  return range(0, MAX_COUNT_STOPS, 1).map(stops => {
    const group = ticketsGroup[stops];

    return isArray(group) ? ticketsGroup[stops].length : 0;
  });
};

export const getFilter = state => {
  return state.ticketsFilter;
};
