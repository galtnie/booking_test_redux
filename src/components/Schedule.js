import '../css/Schedule.css'
import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from './CircularProgress';
import RoomDeterminer from './RoomDeterminer';


class Schedule extends React.Component {

    composeSlotId = (hour, colour) => {         // elaborate the function so that i can use it from 'while', i need a possibility to add the 'date' i need
        const fullDate = (this.props.date) ? new Date(this.props.date) : new Date()
        const date = fullDate.getDate()
        const keyDate = date.toString().length === 2 ? date : "0" + date;
        const keyMonth = (fullDate.getMonth() + 1).toString().length === 2 ? (fullDate.getMonth() + 1) : "0" + (fullDate.getMonth() + 1);
        const keyYear = fullDate.getYear().toString().slice(1);
        const idHour = String(hour).length === 1 ? "0" + hour : hour;
        return (`date:${keyDate}${keyMonth}${keyYear}hour:${idHour}colour:${colour}`);
    }

    renderOneHourRooms = (hour) => {
        let oneHourColumn = []
        oneHourColumn.push(<div className='hour-container' key={`${hour}h`}>{hour}"</div>)
        for (let j = 0; j < this.props.colours.length; j++) {
            oneHourColumn.push(<div key={`${hour}${j}`}> <RoomDeterminer id={this.composeSlotId(hour, this.props.colours[j])} /> </div>)
        }
        return <div key={hour} className='one-hour-container'>{oneHourColumn}</div>
    }

    renderDayCard = () => {
        let hourColumns = []
        for (let i = 0; i <= 23; i++) {
            hourColumns.push(this.renderOneHourRooms(i))
        }
        return hourColumns
    }

    calculateReservedSlots() {
        console.log('STARTS>>>')
        console.log(this.props.tickets)
        // console.log(this.props.date)
        let newSlots = []
        

        for (let i = 0; i < this.props.tickets.length; i++) {
            let fromTime = new Date(this.props.tickets[i].from)
            let toTime = new Date(this.props.tickets[i].to)
            const title = this.props.tickets[i].title
            if (toTime < new Date()) { continue }

            else if (fromTime !== toTime && fromTime < toTime) {
                fromTime = new Date(new Date(new Date(fromTime.setMilliseconds(0)).setSeconds(0)).setMinutes(0))
                toTime = new Date(new Date(new Date(toTime.setMilliseconds(0)).setSeconds(0)).setMinutes(0))


                let theDay = (this.props.date) ? new Date(this.props.date) : new Date()
                let dayChosenStart = (new Date(new Date(new Date(new Date(theDay).setHours(0)).setMinutes(0)).setSeconds(0)).setMilliseconds(0)) - 5
                let dayChosenEnd = (new Date(new Date(new Date(new Date(theDay).setHours(23)).setMinutes(59)).setSeconds(59)).setMilliseconds(999)) + 5

                if ((fromTime <= dayChosenStart && toTime >= dayChosenStart) ||
                    (fromTime >= dayChosenStart && toTime <= dayChosenEnd) ||
                    (fromTime <= dayChosenEnd && toTime >= dayChosenEnd)) {
                        
                        while(new Date (fromTime).setHours(0) !== new Date (toTime).setHours(0) ) {
                            this.composeSlotId() // STOPPED HERE THINKING OVER HOT TO INCLUDE NEEDED DATE INTO THE FUNCTION


                        }

                        // newSlots.push({
                        //     from: fromTime,
                        //     to: toTime
                        // })

                       
                        // this is how to add one hour: 
                        //    var today = new Date();
                        //    today.setHours(today.getHours() + 8);

                
                    }
            }
        }

        console.log(newSlots)
    }

            render() {
                if (this.props.tickets && !this.props.reservedSlots) {
                    this.calculateReservedSlots()
                }

                return (
                    this.props.tickets
                        ?
                        <div className='all-hours-container'>
                            {this.renderDayCard()}
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
                colours: state.colours,
                date: state.dateInput
            };
        };
        export default connect(mapStateToProps, {})(Schedule);