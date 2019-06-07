import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Home from './Home'
import Login from './Login'
import Booking from './Booking'
import SignUpForm from './SignUpForm'
import Charts from './Charts'



const App = () => {
    return (
        
        
                <Switch>
                   <Route path='/' exact component={Home} />
                   <Route path='/login' component={Login} />
                   <Route path='/booking' component={Booking} />
                   <Route path='/signup' component={SignUpForm} />
                   <Route path='/charts' component={Charts} />
              </Switch>    
    
    );
};


// 

export default App;