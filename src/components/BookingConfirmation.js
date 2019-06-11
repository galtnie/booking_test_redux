import React from 'react'
import { connect } from 'react-redux'
import { 
    fetchTickets, 
    fetchHalls, 
    discardAllSelectedSlots, 
    determineReservedSlots, 
    determineUsersPriorReservations, 
    createNewTicket 
} from '../actions';
import { 
    ConfirmContainer, 
    ConfirmTitle,
    ConfirmTicketContainer,
    ConfirmTitleInput,
    ConfirmClickBttnNote,
    ConfirmBttnsContainer
} from '../styles'


class BookingConfirmation extends React.Component {
    handleConfirmation(tickets) {
        this.props.discardAllSelectedSlots()
        this.props.closeWindow()
        this.props.createNewTicket(tickets, this.props.user)
        this.props.fetchTickets();
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
            <ConfirmContainer>
                <ConfirmTitle>
                    Please enter a title of the event for each reservation prior to order confirmation.
                </ConfirmTitle>
                {this.props.tickets.map((i, index) => {
                    return (
                        <ConfirmTicketContainer key={index}>
                            <p>
                                HALL: {this.props.halls.find((e) => e._id === this.props.tickets[index].hall_id).title}  <br />
                                FROM: {new Intl.DateTimeFormat('en-GB', timeOptionsForRendering).format(this.props.tickets[index].from)} <br />
                                TO: {new Intl.DateTimeFormat('en-GB', timeOptionsForRendering).format(this.props.tickets[index].to)}
                            </p>
                            <div className="ui input">
                                <ConfirmTitleInput type="text" placeholder="Event title"
                                    onChange={(e) => {
                                        let newArray = this.props.tickets
                                        newArray[index].title = e.target.value
                                        this.props.alterTickets(newArray)
                                    }}
                                />
                            </div>
                        </ConfirmTicketContainer>
                    )
                }
                )}
                <ConfirmClickBttnNote>
                    Once you entitled each of the events, please confirm the order for its processing.
                </ConfirmClickBttnNote>
                <ConfirmBttnsContainer>
                    <button className="ui primary button" onClick={() => { this.handleConfirmation(this.props.tickets) }}>
                        Confirm
                    </button>
                    <button className="ui button" onClick={this.props.closeWindow}>
                        Cancel
                    </button>
                </ConfirmBttnsContainer>
            </ConfirmContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        reservedTickets: state.tickets,
        halls: state.halls,
        user: state.user,
        dateInput: state.dateInput,
        priorReservations: state.usersPriorReservations
    }
}

export default connect(mapStateToProps,
    {
        fetchTickets,
        fetchHalls,
        discardAllSelectedSlots,
        determineReservedSlots,
        determineUsersPriorReservations,
        createNewTicket,

    })(BookingConfirmation);