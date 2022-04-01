import React from 'react';
import ReactDOM from 'react-dom';
import './custom.css';
import MainTable from './Components/MainTable'
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { storeExport } from './store';
import { createStore } from 'redux';



ReactDOM.render(
  <Provider store={storeExport}>
    <MainTable />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
