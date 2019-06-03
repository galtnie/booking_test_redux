import React from 'react';
import { Router, Switch, Route} from 'react-router-dom';
import Home from './Home'
import Login from './Login'
import Booking from './Booking'
import SignUpForm from './SignUpForm'
import history from './history'


const App = () => {
    return (
        
            <Router basename='/booking_test_redux' history={history}>
                <Switch>
                   <Route path='/' exact component={Home} />
                   <Route path='/login' component={Login} />
                   <Route path='/booking' component={Booking} />
                   <Route path='/signup' component={SignUpForm} />
                </Switch>
            </Router>
    
    );
};


// 

export default App;