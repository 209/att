import 'whatwg-fetch';
import tickets from 'tickets.json';

export const getTickets = () => {
  return new Promise(resolve => resolve(JSON.parse(tickets).tickets));
};
