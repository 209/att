import 'whatwg-fetch';

const URL = 'http://backoffice.aviasales.ru/api/statistics?from=2017-10-27&to=2017-11-02&interval=1h';
const header = 'Bearer eyJpYXQiOjE1MDkzNDEzNzgsImFsZyI6IkhTMjU2IiwiZXhwIjoxNTQwNDQ1Mzc4fQ.eyJpZCI6MTI2NiwicGVybWlzc2lvbnMiOlsiQmFzaWMgUmVwb3J0cyJdLCJnYXRlX2lkIjotMTQzLCJleHAiOiIyMDE4LTEwLTI1IDA1OjI5OjM4In0.dD_So803EIkRM86ARm1RxPy85lzNse2hNaPMjndkPpg';

export const getStatisticsApi = () => {
  return fetch(URL, {
    headers: new Headers({
      Authorization: header,
    }),
  })
    .then(response => response.json());
};
