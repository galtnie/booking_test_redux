import '../css/Schedule.css'
import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from './CircularProgress';
import RoomDeterminer from './RoomDeterminer';
import { determineReservedSlots, determineUsersPriorReservations } from '../actions';
import { composeSlotId, calculateReservedSlots } from '../functions'

class Schedule extends React.Component {

    componentWillReceiveProps(nextProps){
        if (nextProps.tickets !== this.props.tickets) {
            this.props.determineReservedSlots(calculateReservedSlots(nextProps.tickets, this.props.halls, this.props.date));
            if (this.props.user !== null){
                this.props.determineUsersPriorReservations(nextProps.tickets, this.props.user._id)}
        }      
    }

    renderOneHourRooms = (hour, halls, date) => {
        let oneHourColumn = []
        oneHourColumn.push(<div className='hour-container' key={`${hour}h`}>{hour}"</div>)

        for (let j = 0; j < halls.length; j++) {

            oneHourColumn.push(
                <div key={`${hour}${j}`}>
                    <RoomDeterminer id={composeSlotId(date, hour, halls[j].colour)} />
                </div>
            );
        }
        return <div key={hour} className='one-hour-container'>{oneHourColumn}</div>
    }

    renderDayCard = (halls, date) => {
        let hourColumns = []
        for (let i = 0; i <= 23; i++) {
            hourColumns.push(this.renderOneHourRooms(i, halls, date))
        }
        return hourColumns
    }

    render() {
        return (
            this.props.reservedSlots
                ?
                <div className='all-hours-container'>
                    {this.renderDayCard(this.props.halls, this.props.date)}
                </div>
                :
                <div className="ciruclar-progress-container">
                    <CircularProgress />
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tickets: state.tickets,
        halls: state.halls,
        date: state.dateInput,
        reservedSlots: state.reservedSlots,
        user: state.user,
    };
};
export default connect(mapStateToProps, { determineReservedSlots, determineUsersPriorReservations })(Schedule);