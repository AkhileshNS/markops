// External Modules
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';

// Internal Components, stores and styles
import App from 'App/App';
import * as stores from 'App/App.stores';
import { GlobalStyle } from 'global/styles';

// Service Worker
import * as serviceWorker from './serviceWorker';

const app = <Provider {...stores}>
  <React.Fragment>
    <App />
    <GlobalStyle />
  </React.Fragment>
</Provider>;

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
