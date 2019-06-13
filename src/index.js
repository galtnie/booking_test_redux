import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import store from './store'
import history from './history'
import { Router} from 'react-router-dom';

ReactDOM.render(
    <Provider store={store}>
        <Router history={history} basename={process.env.PUBLIC_URL}>
            <App />
        </Router>
    </Provider>, 
    document.querySelector('#root')
);



// basename='/booking_test_redux'