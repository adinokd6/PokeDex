import React from 'react';
import ReactDOM from 'react-dom';
import './custom.css';
import { Provider } from 'react-redux';
import { storeExport } from './Components/store';
import MainWindow from './Components/MainWindow';




ReactDOM.render(
  <Provider store={storeExport}>
    <MainWindow searchName={""} />
  </Provider>,
  document.getElementById('root')
);
