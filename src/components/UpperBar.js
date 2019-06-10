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
  state={
    burger: 'none'
  }


  renderUpperMenu = () =>{
    if (history.location.pathname === "/booking" && window.screen.width > 480) {
      return(
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
            <b>Sign out</b>
          </Button>
        </Link> 
      </div>
      );
    } else if (history.location.pathname === "/" && window.screen.width > 480) {
      return(
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
            <b>Sign in</b>
          </Button>
        </Link>
      </div>
      );
    } else if (history.location.pathname === "/charts" && window.screen.width > 480) {
      return(
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
      );
    } else {
      return (
       <div  className="burger-menu-icon" 
          onClick={() => {
          this.state.burger === 'none' ? this.setState({burger: 'flex'}) : this.setState({burger: 'none'}) 
          }}
        >
          <i className="fa fa-bars" ></i>
        </div>
      );
     }
  } 
  
  renderBurgerMenu = () => {
    if (history.location.pathname === "/") {
      return(
        <div className="burger-menu" style={{ display: this.state.burger }} >
        <Link to="/charts">
          <span className='burger-menu-span'>
            <b>Charts</b>
          </span>
        </Link >
        <Link to="/signup">
          <span className='burger-menu-span'>
            <b>Sign up</b>
          </span>
        </Link>
        <Link to="/login">
          <span className='burger-menu-span'>
            <b>Sign in</b>
          </span>
        </Link>
        </div>
      );
    } else if (history.location.pathname === "/booking") {
      return(
        <div className="burger-menu" style={{ display: this.state.burger }} >
          <Link to="/charts">
            <span className='burger-menu-span'> 
              <b>Charts</b> 
            </span>
          </Link>
          <Link to="/">
            <span className='burger-menu-span'
            onClick={()=> { 
            this.props.discardUser(); 
            this.props.discardAllSelectedSlots()
            this.props.resetDate()
              }}>
              <b>Sign out</b>
            </span>
          </Link> 
        </div>
      );
    } else if (history.location.pathname === "/charts") {
      return(      
        <div className="burger-menu" style={{ display: this.state.burger }} >         
        {
          this.props.user === null
          ?
          <Link to="/">
            <span className='burger-menu-span'>
              <b>Home</b>
            </span>
          </Link>
          :
          <Link to="/booking">
            <span className='burger-menu-span'>
              <b>Booking</b>
            </span>
          </Link>
        }
      </div>
      );
    }
  }


  render() {
    console.log()

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
            { this.renderUpperMenu()}
            { window.screen.width <= 480 && this.renderBurgerMenu()}
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

