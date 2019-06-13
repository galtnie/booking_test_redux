import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DateSearch from './DateSearch';
import SwitchBack from './SwitchBack'
import SwitchForth from './SwitchForth'
import CurrentDate from './CurrentDate'
import history from '../history'
import { connect } from 'react-redux'
import { discardUser, discardAllSelectedSlots, resetDate } from '../actions' 
import { 
  UpperbarContainer,
  UpperAppBar,
  UpperToolbar,
  DateSwitcherContainer,
  SignupButton,
  SigninButton,
  BurgerMenuIconContainer,
  BurgerMenu,
  BurgerMenuSpan,
} from '../styles'

class UpperBar extends Component {
  state={
    burger: 'none'
  }

  componentDidMount() {
console.log(window.location.pathname)
    
  }
  handleEntranceExit = () => {
    this.props.discardUser(); 
    this.props.discardAllSelectedSlots()
    this.props.resetDate()
  }

  handleBurgerMenuIconClick = () => {
    this.state.burger === 'none' ? this.setState({burger: 'flex'}) : this.setState({burger: 'none'})    
  }

  renderUpperMenu = () =>{
    console.log(window.screen.width)
    console.log(window.screen)

    if (window.screen.width <= 480) {
      return (
       <BurgerMenuIconContainer onClick={this.handleBurgerMenuIconClick}>
          <i className="fa fa-bars" />
        </BurgerMenuIconContainer>
      );
     }
    else if (window.location.pathname === "/booking") {
      return(
        <div>
        <Link to="/charts">
          <SignupButton value='Charts'>
            Charts
          </SignupButton>
       </Link>
       <Link to="/">
          <SigninButton onClick={this.handleEntranceExit}>
            Sign out
          </SigninButton>
        </Link> 
      </div>
      );
    } else if (window.location.pathname === "/") {
      return(
        <div>
        <Link to="/charts">
          <SignupButton>
            Charts
          </SignupButton>
        </Link>
        <Link to="/signup">
          <SignupButton>
            Sign up
          </SignupButton>
        </Link>
        <Link to="/login">
          <SigninButton>
            <b>Sign in</b>
          </SigninButton>
        </Link>
      </div>
      );
    } else if (window.location.pathname === "/charts") {
      return(
        <div>
        {
          this.props.user === null
          ?
          <Link to="/">
            <SignupButton>
              Home
            </SignupButton>
          </Link>
          :
          <Link to="/booking">
            <SignupButton>
              Booking
            </SignupButton>
          </Link>
        }
      </div>
      );
    } 
  } 
  
  renderBurgerMenu = () => {
    if (window.location.pathname === "/") {
      return(
        <BurgerMenu display={this.state.burger}>
        <Link to="/charts">
          <BurgerMenuSpan>
            Charts
          </BurgerMenuSpan>
        </Link >
        <Link to="/signup">
          <BurgerMenuSpan>
            Sign up
          </BurgerMenuSpan>
        </Link>
        <Link to="/login">
          <BurgerMenuSpan>
            Sign in
          </BurgerMenuSpan>
        </Link>
        </BurgerMenu>
      );
    } else if (window.location.pathname === "/booking") {
      return(
        <BurgerMenu display={this.state.burger}>
          <Link to="/charts">
            <BurgerMenuSpan>
              Charts 
            </BurgerMenuSpan>
          </Link>
          <Link to="/">
            <BurgerMenuSpan onClick={this.handleEntranceExit}>
              Sign out
            </BurgerMenuSpan>
          </Link> 
        </BurgerMenu>
      );
    } else if (window.location.pathname === "/charts") {
      return(      
        <BurgerMenu display={this.state.burger}>        
        {
          this.props.user === null
          ?
          <Link to="/">
            <BurgerMenuSpan>
              Home
            </BurgerMenuSpan>
          </Link>
          :
          <Link to="/booking">
            <BurgerMenuSpan>
              Booking
            </BurgerMenuSpan>
          </Link>
        }
      </BurgerMenu>
      );
    }
  }

  render() {
      return (
      <UpperbarContainer>
        <UpperAppBar position="static">
          <UpperToolbar>
            <DateSearch />          
            <DateSwitcherContainer>
              <SwitchBack />
              <CurrentDate />
              <SwitchForth />
            </DateSwitcherContainer>
            { this.renderUpperMenu()}
            { window.screen.width <= 480 ? this.renderBurgerMenu() : null }
          </UpperToolbar>
        </UpperAppBar>
      </UpperbarContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      user: state.user,
  }
}

export default connect (mapStateToProps, {discardUser, discardAllSelectedSlots, resetDate})(UpperBar);

