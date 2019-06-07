import React from 'react'
import { connect } from 'react-redux'
import '../css/UsersPriorReservations.css'
import { alterUsersPriorReservationsList, fetchTickets, fetchHalls, determineReservedSlots, determineUsersPriorReservations, setTicketToEdit, withdrawTicket } from '../actions'


class UsersPriorReservations extends React.Component {

    componentWillMount(){
        this.props.fetchTickets()
    }

    deleteTicket(e) {
        let itemIndex = e.target.id
        let ticketToDelete = this.props.usersPriorReservations[itemIndex]
        this.props.withdrawTicket(ticketToDelete, this.props.user)
    }

    editTicket(e) {                                            
        this.props.setTicketToEdit(this.props.usersPriorReservations[e.target.id])
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
            <div className="prior-reservations-container ui container">
                <div className='prior-reservations-title-container'>
                    <h3>
                        LIST OF YOUR PRIOR RESERVATIONS:
                    </h3>
                </div>
                <div>
                    {this.props.usersPriorReservations.reverse().map((i, index) => {
                        return (
                            <div key={index} className='prior-reservations-tickets-container'>
                                <div className='prior-reservations-tickets-table-container'>
                                    <table style={{ marginLeft: '1em' }}>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    HALL:
                                                </td>
                                                <td>
                                                    {this.props.halls.find((e) => e._id === i.hall_id).title}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    EVENT:
                                                </td>
                                                <td>
                                                    {i.title}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    FROM:
                                                </td>
                                                <td>
                                                    {new Intl.DateTimeFormat('en-GB', timeOptionsForRendering).format(i.from)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    TO:
                                                </td>
                                                <td>
                                                    {new Intl.DateTimeFormat('en-GB', timeOptionsForRendering).format(i.to)}

                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div style={{ marginRight: "1em" }}>
                                        <button className="ui olive button" id={index} onClick={(e) => this.editTicket(e)} style={{ marginRight: "1em", marginBottom: "1em" }}>
                                            EDIT
                                        </button>
                                        <button id={index} className="ui red button" onClick={(e) => this.deleteTicket(e)} >
                                            DELETE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        usersPriorReservations: state.usersPriorReservations,
        halls: state.halls,
        user: state.user,
        tickets: state.tickets,
    }
}

export default connect(mapStateToProps, 
    { 
        alterUsersPriorReservationsList,
        fetchTickets, 
        fetchHalls, 
        determineReservedSlots,
        determineUsersPriorReservations,
        setTicketToEdit,
        withdrawTicket
    })(UsersPriorReservations)
