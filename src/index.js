import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import store from './store'
import history from './history'
import { Router} from 'react-router-dom';

ReactDOM.render(
    <Provider store={store}>
        <Router history={history} basename='/booking_test_redux'>
            <App />
        </Router>
    </Provider>, 
    document.querySelector('#root')
);