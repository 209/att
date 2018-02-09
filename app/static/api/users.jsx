import 'whatwg-fetch';

const URL = '/api/users';

export const getUsers = term => {
  const fullUrl = term ? `${URL}?=${term}` : URL;

  return fetch(fullUrl, {
    method: 'GET',
  })
    .then(response => response.json());
};

export const getUsersURL = url => {
  return fetch(url, {
    method: 'GET',
  })
    .then(response => response.json());
};
