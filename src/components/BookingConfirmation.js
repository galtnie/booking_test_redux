import React from 'react'
import { connect } from 'react-redux' 
import axios from 'axios'
import { fetchTickets, fetchHalls, discardAllSelectedSlots, determineReservedSlots, determineUsersPriorReservations } from '../actions';
import { calculateReservedSlots } from '../functions'


class BookingConfirmation extends React.Component {
    state={}

    handleConfirmation(tickets){
        let axiosRequests = []

        for (let i = 0; i < tickets.length; i++) {
            let request = axios({
                method: 'post',
                url: 'https://web-ninjas.net/tickets',
                data: {
                    hall_id: tickets[i].hall_id,
                    user_id: this.props.user._id,
                    title: tickets[i].event_title,
                    from: tickets[i].from,
                    to: tickets[i].to,
                },
                headers: {
                    ContentType: "application/x-www-form-urlencoded",
                    Authorization: this.props.user.token,
                }
            })
            axiosRequests.push(request)
        }

        Promise.all(axiosRequests)
            .then(()=>{
                this.props.fetchTickets();
                this.props.fetchHalls();
            })
            .then(() => {
                this.props.closeWindow();
                this.props.discardAllSelectedSlots()
            })
            .then(()=> {
                this.props.determineReservedSlots(calculateReservedSlots([...this.props.tickets, ...this.props.reservedTickets], this.props.halls, this.props.dateInput))
            })
            .then(()=>{
                console.log('PRIOR ', this.props.reservedTickets)
                console.log('newOrder ', this.props.tickets)
                console.log('BOTH ', [...this.props.tickets, ...this.props.reservedTickets])
                this.props.determineUsersPriorReservations([...this.props.tickets, ...this.props.reservedTickets], this.props.user._id)

            })
            .catch(error => {
                console.dir(error)
                console.log(error.message)
            })
    }

    render() {
        const timeOptionsForRendering = {
            day: 'numeric',
            weekday: 'long',
            year: 'numeric',
            month: 'long', 
            hour: 'numeric', 
            minute: 'numeric',
        }

        return (
            <div  style={{
                position: "fixed", background: '#E8F1F2', color: "#13293D", top: "2em", padding: "2em", borderRadius: "1em", overflowY: "auto",
                maxHeight: "90%",  maxWidth: "90%", border: "1em solid #2185D0"
            }}>
                <h2 style={{ color: "#945600" }}>Please enter a title of the event for each reservation prior to order confirmation.</h2>
                {this.props.tickets.map((i, index) => {

                    return (
                        <div key={index} style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", width: "100%" }} >
                            <p>
                                HALL: {this.props.halls.find((e)=> e._id === this.props.tickets[index].hall_id).title}  <br />
                                FROM: {new Intl.DateTimeFormat('en-GB', timeOptionsForRendering).format(this.props.tickets[index].from)} <br />
                                TO: {new Intl.DateTimeFormat('en-GB', timeOptionsForRendering).format(this.props.tickets[index].to)}
                            </p>
                            <div className="ui input">
                                <input type="text"
                                    placeholder="Event title"
                                    style={{
                                        background: '#E8F1F2',
                                        color: "#13293D",
                                        border: "0.1em solid #2185D0",
                                        lineHeight: "18px"
                                    }}
                                    onChange={(e) => {
                                        let newArray = this.props.tickets
                                        newArray[index].event_title = e.target.value
                                        this.props.alterTickets(newArray)
                                    }}
                                />
                            </div>
                        </div>
                    )
                }
                )}
    
    

    <h3 style={{ color: "#945600" }}>
        Once you entitled each of the events, please confirm the order for its processing.
    </h3>
    <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <button className="ui primary button" onClick={()=>{this.handleConfirmation(this.props.tickets)}}>
            Confirm
        </button>
        <button className="ui button" onClick={this.props.closeWindow}>
            Cancel 
       </button>
    </div>
</div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        reservedTickets: state.tickets,
        halls: state.halls,
        user: state.user,
        dateInput: state.dateInput,    
    }
}

export default connect(mapStateToProps,
    { 
        fetchTickets, 
        fetchHalls,
        discardAllSelectedSlots,
        determineReservedSlots,
        determineUsersPriorReservations,
    })(BookingConfirmation);