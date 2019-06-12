import React from 'react';
import { connect } from 'react-redux';
import { handleDateInputSubmit, handleUpperBackSwitcher, determineReservedSlots } from '../actions';
import { calculateReservedSlots } from '../functions'
import { Switcher } from '../styles'

class SwitchBack extends React.Component {
  handleDayChange() {
    let fullDate = this.props.dateInput ? new Date(this.props.dateInput) : new Date()
    let nextDate = fullDate.getDate() - 1;
    let nextDateMls = fullDate.setDate(nextDate)
    this.props.handleDateInputSubmit(nextDateMls)
    const tomorrow = new Date(new Date(new Date(new Date((new Date(new Date().getTime() + (24 * 60 * 60 * 1000))).setHours(0)).setMinutes(0)).setSeconds(0)).setMilliseconds(0));
    if (nextDateMls < tomorrow) {
      this.props.handleUpperBackSwitcher('inactive')
    } 
    this.props.determineReservedSlots(calculateReservedSlots(this.props.tickets, this.props.halls, nextDateMls))
  }
  render() {
    return (
      <Switcher inactive={this.props.switcherStatus === 'inactive' ? true : false} className={`big caret left icon`} 
        onClick={(e)=>{ if (this.props.switcherStatus === "inactive") {e.preventDefault()} else {this.handleDayChange()} }}
      />
    );
  }
} 

const mapStateToProps = (state) => {
  return { 
    switcherStatus: state.backSwitcher, 
    dateInput: state.dateInput,
    tickets: state.tickets,
    halls: state.halls
  }; 
};
export default connect (mapStateToProps, {
  handleDateInputSubmit, 
  handleUpperBackSwitcher,
  determineReservedSlots
})(SwitchBack);