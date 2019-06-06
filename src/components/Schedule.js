import '../css/Schedule.css'
import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from './CircularProgress';
import RoomDeterminer from './RoomDeterminer';
import { determineReservedSlots } from '../actions';
import { composeSlotId } from '../functions'

class Schedule extends React.Component {

    // componentWillReceiveProps(nextProps){
    //     console.log(nextProps.tickets)
        
    // }

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
    };
};
export default connect(mapStateToProps, { determineReservedSlots })(Schedule);