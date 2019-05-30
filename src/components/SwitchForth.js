import '../css/UpperBar.css'
import React from 'react';
import { connect } from 'react-redux';
import { handleDateInputSubmit, handleUpperBackSwitcher, determineReservedSlots } from '../actions';
import { calculateReservedSlots } from '../functions'

class SwitchForth extends React.Component {
    handleDayChange() {
        let fullDate = this.props.dateInput ? new Date(this.props.dateInput)  : new Date()
        let nextDate = fullDate.getDate() + 1;
        let nextDateMls = fullDate.setDate(nextDate)
        this.props.handleDateInputSubmit(nextDateMls)
        this.props.handleUpperBackSwitcher('active')
        this.props.determineReservedSlots(calculateReservedSlots(this.props.tickets, this.props.halls, nextDateMls))
      }

    render() {
        return (
            <i className={"next-day big caret right icon"} style={{width:"0.6em"}} 
                onClick={()=>{
                  this.handleDayChange(true)}}>
              </i>
        );
    }
} 

const mapStateToProps = (state) => {
    return { 
      switcherStatus: state.backSwitcher, 
      dateInput: state.dateInput,
      tickets: state.tickets,
      halls: state.halls,      
    }; 
  };
  export default connect (mapStateToProps, { 
    handleDateInputSubmit, 
    handleUpperBackSwitcher,
    determineReservedSlots
  })(SwitchForth);



// let nextDate = fullDate.getDate() + counter;
//     fullDate.setDate(nextDate);



