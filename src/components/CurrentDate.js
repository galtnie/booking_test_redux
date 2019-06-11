import React from 'react';
import { connect } from 'react-redux';
import { CurrentDateContainer } from '../styles';

class CurrentDate extends React.Component {

    renderDate() {
        const fullDate = this.props.dateInput !== '' ? new Date(this.props.dateInput) : new Date()
        const monthOption = { month: 'long' };
        const weekdayOption = { weekday: 'long' };
        const date = fullDate.getDate()
        const month = new Intl.DateTimeFormat('en-GB', monthOption).format(fullDate)
        const weekday = new Intl.DateTimeFormat('en-GB', weekdayOption).format(fullDate)
        return (`${date} ${month}, ${weekday}`)
    }

    render() {
        return (
            <CurrentDateContainer>
              {this.renderDate()}
            </CurrentDateContainer>
        );
    }
} 

const mapStateToProps = (state) => {
    return { dateInput: state.dateInput }; 
};
export default connect (mapStateToProps, {})(CurrentDate);