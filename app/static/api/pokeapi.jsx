import 'whatwg-fetch';

export const getLastApi = () => {
  return fetch('https://pokeapi.co/api/v2/')
    .then(response => response.json());
};


export const getPockemons = () => {
  return getLastApi()
    .then(api => fetch(api.pokemon))
    .then(response => response.json());
};

export const getDataFromUrl = (url) => {
  return fetch(url)
    .then(response => response.json());
};
