import React from 'react'
import UpperBar from './components/UpperBar'
import Guide from './components/Guide'
import Halls from './components/Halls'
import Schedule from './components/Schedule'
import Title from './components/Title'
import TicketEdition from './components/TicketEdition'
import UsersPriorReservations from './components/UsersPriorReservations'
import { connect } from 'react-redux';
import { fetchTickets, fetchHalls, determineReservedSlots, determineUsersPriorReservations } from './actions';
import CircularProgress from './components/CircularProgress';
import BookingConfirmation from './components/BookingConfirmation';
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import './css/Booking.css'
import { prepareSelectedSlotsRendering, calculateReservedSlots } from './functions'

class Booking extends React.Component {
    state = {
        bookingConfirmation: false,
        ticketsToReserve: null
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tickets !== this.props.tickets){      
            this.props.determineReservedSlots(calculateReservedSlots(this.props.tickets, this.props.halls, this.props.dateInput, this.props.user._id)) 
        }
    }

    handlePaymentButtonClicking = () => {
        const tickets  = prepareSelectedSlotsRendering(this.props.selectedSlots, this.props.halls, this.props.user)
        this.setState({ticketsToReserve: tickets})
        this.setState({bookingConfirmation: true})
    }

    alterTicketsToReserve = (newValue) => {
        this.setState({ticketsToReserve: newValue})
    }

    closePaymentWindow = () => {
        this.setState({bookingConfirmation: false})
    }

    render() {
        return (
            (this.props.user)
                ?
                <div className='main'>
                    <UpperBar />
                    <Title />
                    <Guide />
                    {(this.props.halls) ? <Halls /> : <CircularProgress /> }
                    {(this.props.tickets && this.props.halls) ? <Schedule /> : <CircularProgress /> }
                    {this.state.bookingConfirmation ? <BookingConfirmation tickets={this.state.ticketsToReserve} alterTickets={this.alterTicketsToReserve} closeWindow={this.closePaymentWindow}/> : null}
                    {this.props.ticketToEdit ? <TicketEdition /> : null}
                    <Button 
                        disabled={Boolean(!this.props.selectedSlots.length)} 
                        variant="contained" 
                        size="medium" 
                        color="primary" 
                        className='payment-button' 
                        onClick={this.handlePaymentButtonClicking}
                    >
                        Payment
                    </Button>

                    { this.props.usersPriorReservations.length > 0  ?  <UsersPriorReservations />  :  null }

                </div>
                :
                <Redirect to='/' />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dateInput: state.dateInput,
        tickets: state.tickets,
        halls: state.halls,
        user: state.user,
        selectedSlots: state.selectedSlots,
        usersPriorReservations: state.usersPriorReservations,
        ticketToEdit: state.ticketToEdit,
    }
}

export default connect(mapStateToProps,
    {
        fetchTickets,
        fetchHalls,
        determineReservedSlots,
        determineUsersPriorReservations,
    })(Booking);