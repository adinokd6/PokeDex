import React from 'react';
import ReactDOM from 'react-dom';
import './custom.css';
import MainTMainWindowable from './Components/MainWindow'
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { storeExport } from './store';
import MainWindow from './Components/MainWindow';




ReactDOM.render(
  <Provider store={storeExport}>
    <MainWindow />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
