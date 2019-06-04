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
import history from '../history'
import { connect } from 'react-redux'
import { discardUser } from '../actions' 


class UpperBar extends Component {
  render() {

    return (
      <div className="upperbar-container">
        <AppBar position="static">
          <Toolbar className="toolbar">
            <DateInput />
            <div className='date-render-switcher-container'>
              <SwitchBack />
              <CurrentDate />
              <SwitchForth />
            </div>
            <div>
              {
                (history.location.pathname === "/booking")
                  ?
                  <Link to="/">
                    <Button className='signin-button signup-button' onClick={this.props.discardUser}>
                      Sign out
                    </Button>
                  </Link>
                  :
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
              }
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default connect (null, {discardUser})(UpperBar);


// ButtonAppBar.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(ButtonAppBar);