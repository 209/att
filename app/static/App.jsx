import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './component/App';
import configureStore from './configureStore';

const SELECTOR = document.getElementById('js-base-container');
const store = configureStore();

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , SELECTOR,
  );
};

export default render;
