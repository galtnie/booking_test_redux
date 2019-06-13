import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import store from './store'
import history from './history'
import { BrowserRouter, Router} from 'react-router-dom';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter history={history} basename='/booking_test_redux'>
            <App />
        </BrowserRouter>
    </Provider>, 
    document.querySelector('#root')
);