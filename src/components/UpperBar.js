import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import DateInput from './DateInput';
import '../css/UpperBar.css';


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  loginButton: {
    color: '#FBFBFF',
    cursor: 'pointer',
  }
};


class ButtonAppBar extends Component {
     render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className="toolbar"> 

            <DateInput handleDateInput={this.props.handleDateInput}
                        dateInput = {this.props.dateInput}
                        controlDateInput = {this.props.controlDateInput}
             />

            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "sans-serif", 
              fontSize: "1em",  
            }}> 
              <i className={`${this.props.back}-previous-day big caret left icon`} style={{width:"0.6em"}} 
                onClick={(e)=>{
                if (this.props.back === "inactive") {
                  e.preventDefault()
                } else {
                  this.props.handleDayChange(false)

                }
              }}>
              </i>
              <div style={{fontFamily: "sans-serif", fontSize: "1.3em" }}>
              {this.props.date} 
              </div>
              <i className={"next-day big caret right icon"} style={{width:"0.6em"}} 
                onClick={()=>{
                  this.props.handleDayChange(true)}}>
              </i>
            </div>


            <div>
              <Link to="/signup">
                <Button className={classes.loginButton}>
                  Sign up
              </Button>
              </Link>
              <Link to="/login">
                <Button className={classes.loginButton} style={{ color: "#15cda8", fontWeight: "bold", marginLeft: "0.5em", border: "solid 0.25em #15cda8" }}>
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
ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);