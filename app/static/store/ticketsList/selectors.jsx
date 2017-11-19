import filter from 'lodash-es/filter';
import { getFilter } from 'store/ticketsFilter/selectors';

export const getTickets = state => {
  const ticketFilter = getFilter(state);

  return filter(state.ticketsList, ({ stops }) => ticketFilter[stops]);
};
