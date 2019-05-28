
import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './Home'
import Login from './Login'
import Booking from './Booking'
import SignUpForm from './SignUpForm'


const App = () => {
    return (
        <div>
            <BrowserRouter basename='/booking_test_redux'>
                <Switch>
                   <Route path='/' exact component={Home} />
                   <Route path='/login' component={Login} />
                   <Route path='/booking' component={Booking} />
                   <Route path='/signup' component={SignUpForm} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};


// 

export default App;