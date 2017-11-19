import 'whatwg-fetch';
import tickets from 'tickets.json';

export const getTicketsApi = () => {
  return fetch('/api/tickets')
    .then(response => response.json())
    .then(response => response.tickets);
};

export const getTicketsLocal = () => {
  return new Promise(resolve => resolve(JSON.parse(tickets).tickets));
};
