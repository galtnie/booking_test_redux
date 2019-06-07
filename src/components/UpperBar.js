import '../css/UpperBar.css'
import React, { Component } from 'react';
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
import { discardUser, discardAllSelectedSlots, resetDate } from '../actions' 


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
            
            { history.location.pathname === "/booking" &&
                  <div>
                    <Link to="/charts">
                      <Button className='signup-button'>
                        <b>Charts</b>
                      </Button>
                    </Link>
                    <Link to="/">
                      <Button className='signin-button' onClick={()=> {
                        this.props.discardUser(); 
                        this.props.discardAllSelectedSlots()
                        this.props.resetDate()
                      }}>
                        Sign out
                      </Button>
                    </Link>
                  </div>
            }

            { history.location.pathname === "/" &&
                  <div>
                    <Link to="/charts">
                      <Button className='signup-button'>
                        <b>Charts</b>
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button className='signup-button'>
                        <b>Sign up</b>
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button className='signin-button'>
                        Sign in
                      </Button>
                    </Link>
                  </div>
            }

            { history.location.pathname === "/charts" &&
                  <div>
                    {
                      this.props.user === null
                      ?
                      <Link to="/">
                        <Button className='signup-button'>
                          <b>Home</b>
                        </Button>
                      </Link>
                      :
                      <Link to="/booking">
                        <Button className='signup-button'>
                          <b>Booking</b>
                        </Button>
                      </Link>
                    }
                  </div>
            }


          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      user: state.user,
  }
}

export default connect (mapStateToProps, {discardUser, discardAllSelectedSlots, resetDate})(UpperBar);

