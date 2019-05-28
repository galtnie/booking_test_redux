import '../css/UpperBar.css'
import React from 'react';
import { connect } from 'react-redux';
import { handleDateInputSubmit, handleUpperBackSwitcher } from '../actions';

class SwitchForth extends React.Component {
    handleDayChange() {
        let fullDate = this.props.dateInput ? new Date(this.props.dateInput)  : new Date()
        let nextDate = fullDate.getDate() + 1;
        this.props.handleDateInputSubmit(fullDate.setDate(nextDate))
        this.props.handleUpperBackSwitcher('active')
        // put on slots calculations 
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
    return { switcherStatus: state.backSwitcher, dateInput: state.dateInput }; 
  };
  export default connect (mapStateToProps, {handleDateInputSubmit, handleUpperBackSwitcher})(SwitchForth);



// let nextDate = fullDate.getDate() + counter;
//     fullDate.setDate(nextDate);



