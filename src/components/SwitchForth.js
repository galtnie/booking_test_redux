import React from 'react';
import { connect } from 'react-redux';
import { handleDateInputSubmit, handleUpperBackSwitcher, determineReservedSlots } from '../actions';
import { calculateReservedSlots } from '../functions'
import { Switcher } from '../styles'

class SwitchForth extends React.Component {
  handleDayChange() {
    let fullDate = this.props.dateInput ? new Date(this.props.dateInput)  : new Date()
    let nextDate = fullDate.getDate() + 1;
    let nextDateMls = fullDate.setDate(nextDate)
    this.props.handleDateInputSubmit(nextDateMls)
    this.props.handleUpperBackSwitcher(true)
    this.props.determineReservedSlots(calculateReservedSlots(this.props.tickets, this.props.halls, nextDateMls))
  }
  render() {
    return <Switcher className={"big caret right icon"} onClick={()=>{this.handleDayChange(true)}} />
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


