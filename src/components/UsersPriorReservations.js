import React from 'react'
import { connect } from 'react-redux'
import { 
  alterUsersPriorReservationsList, 
  fetchTickets, 
  fetchHalls, 
  determineReservedSlots, 
  determineUsersPriorReservations, 
  setTicketToEdit, 
  withdrawTicket 
} from '../actions'
import {
  PriorOrdersMain,
  PriorOrdersContainer,
  PriorOrdersTitle,
  PriorOrdersTableContainer,
  PriorOrdersTable,
  PriorOrderTd1,
  PriorOrderTd2,
  PriorOrdersButtonContainer,
  PriorOrdersButton,
} from '../styles'
import { convertToUKdate } from '../functions'

class UsersPriorReservations extends React.Component {

  componentWillMount() {
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

  renderTableRow(name, ticket) {
    let value
    switch (name) {
      case 'HALL:':
        value = this.props.halls.find((e) => e._id === ticket.hall_id).title;
        break;
      case 'EVENT:':
        value = ticket.title;
        break;
      case 'FROM:':
        value = convertToUKdate(ticket.from);
        break;
      case 'TO:':
        value = convertToUKdate(ticket.to);
        break;
      default:
        value = null;
    }
    return (
      <tr>
        <PriorOrderTd1>
          {name}
        </PriorOrderTd1>
        <PriorOrderTd2 />
        <td>
          {value}
        </td>
      </tr>
    );
  }
  render() {
    return (
      <PriorOrdersMain>
        <PriorOrdersTitle>
          LIST OF YOUR PRIOR RESERVATIONS:
        </PriorOrdersTitle>
        <div>
          {this.props.usersPriorReservations.reverse().map((i, index) => {
            return (
              <PriorOrdersContainer key={index}>
                <PriorOrdersTableContainer>
                  <PriorOrdersTable>
                    <tbody>
                      {this.renderTableRow('HALL:', i)}
                      {this.renderTableRow('EVENT:', i)}
                      {this.renderTableRow('FROM:', i)}
                      {this.renderTableRow('TO:', i)}
                    </tbody>
                  </PriorOrdersTable>
                  <PriorOrdersButtonContainer>
                    <PriorOrdersButton className="ui olive button" id={index} onClick={(e) => this.editTicket(e)}>
                      EDIT
                    </PriorOrdersButton>
                    <PriorOrdersButton id={index} className="ui red button" secondary='true' onClick={(e) => this.deleteTicket(e)}>
                      DELETE
                    </PriorOrdersButton>
                  </PriorOrdersButtonContainer>
                </PriorOrdersTableContainer>
              </PriorOrdersContainer>
            );
          })
          }
        </div>
      </PriorOrdersMain>
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