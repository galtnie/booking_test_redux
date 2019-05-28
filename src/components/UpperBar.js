import '../css/UpperBar.css'
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import DateInput from './DateInput';
import SwitchBack from './SwitchBack'
import SwitchForth from './SwitchForth'
import CurrentDate from './CurrentDate'

class ButtonAppBar extends Component {
  render() {

    return (
      <div className="upperbar-container">
        <AppBar position="static">
          <Toolbar className="toolbar"> 
            <DateInput />
            <div  className='date-render-switcher-container'> 
              <SwitchBack />
                <CurrentDate />
              <SwitchForth />
            </div>
            <div>
              <Link to="/signup">
              <Button className='signup-button'>
                  Sign up
              </Button>
              </Link>
              <Link to="/login">
                <Button className='signin-button signup-button'>
                  Sign in
              </Button>
              </Link>
            </div>  
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default ButtonAppBar;


// ButtonAppBar.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(ButtonAppBar);