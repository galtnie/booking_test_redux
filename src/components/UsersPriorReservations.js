import React from 'react'
import { connect } from 'react-redux'
import '../css/UsersPriorReservations.css'
import axios from 'axios' 
import { alterUsersPriorReservationsList, fetchTickets, fetchHalls, determineReservedSlots, determineUsersPriorReservations } from '../actions'
import { calculateReservedSlots } from '../functions'

class UsersPriorReservations extends React.Component {

    deleteTicket(e) {
        let itemIndex = e.target.id
        let ticketToDelete = this.props.usersPriorReservations[itemIndex]
        axios({
            method: 'delete',
            url: `https://web-ninjas.net/tickets/${ticketToDelete._id}`,
            headers: {
                ContentType: "application/x-www-form-urlencoded",
                Authorization: this.props.user.token,
            }
        })
            // .then(() => {
            //     let newList = this.props.usersPriorReservations
            //     newList.splice(itemIndex, 1)
            //     this.props.alterUsersPriorReservationsList(newList)
            // })
            .then(()=>{
                this.props.fetchTickets();
                this.props.fetchHalls();
            })
            .then(()=> {
                this.props.determineReservedSlots(calculateReservedSlots(this.props.tickets, this.props.halls, this.props.dateInput))
            }) 
            .then(()=> {
                this.props.determineUsersPriorReservations(this.props.tickets, this.props.user._id)
            })           
            .catch((e) => console.dir(e))
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
                                    {this.props.usersPriorReservations.map((i, index) => {
                                        return (
                                            <div key={index} className='prior-reservations-tickets-container'>
                                                <div className='prior-reservations-tickets-table-container'>
                                                    <table style={{marginLeft: '1em'}}>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    HALL:
                                                                        </td>
                                                                <td>
                                                                {this.props.halls.find((e)=> e._id === i.hall_id).title}
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
    })(UsersPriorReservations)
