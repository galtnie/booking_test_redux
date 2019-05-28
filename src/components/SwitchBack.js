import '../css/UpperBar.css'
import React from 'react';
import { connect } from 'react-redux';
import { handleDateInputSubmit, handleUpperBackSwitcher } from '../actions';

class SwitchBack extends React.Component {

  handleDayChange() {
    let fullDate = this.props.dateInput ? new Date(this.props.dateInput) : new Date()
    let nextDate = fullDate.getDate() - 1;
    let nextDateMls = fullDate.setDate(nextDate)
    this.props.handleDateInputSubmit(nextDateMls)

    let tomorrow = new Date(new Date(new Date(new Date((new Date(new Date().getTime() + (24 * 60 * 60 * 1000))).setHours(0)).setMinutes(0)).setSeconds(0)).setMilliseconds(0));
    if (nextDateMls < tomorrow) {
      this.props.handleUpperBackSwitcher('inactive')
    } 
 
    // put on slots calculation
  }

    render() {
        return (

            <i className={`${this.props.switcherStatus}-previous-day big caret left icon`} style={{width:"0.6em"}} 
                onClick={(e)=>{
                if (this.props.switcherStatus === "inactive") {
                  e.preventDefault()
                } else {
                  this.handleDayChange()
                }
              }}>
              </i>
        );
    }
} 


const mapStateToProps = (state) => {
  return { switcherStatus: state.backSwitcher, dateInput: state.dateInput }; 
};
export default connect (mapStateToProps, {handleDateInputSubmit, handleUpperBackSwitcher})(SwitchBack);


// let nextDate = fullDate.getDate() + counter;
//     fullDate.setDate(nextDate);