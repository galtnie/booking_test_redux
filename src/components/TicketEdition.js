import React from 'react'
import { connect } from 'react-redux'
import { discardTicketToEdit, editTicket } from '../actions'
import { convertMlsToyyyymmddThhmm, convertYyyymmddThhmmToMls } from '../functions'
import { 
  EditMain, 
  EditTitle,
  EditRow,
  EditFirstColumn,
  EditInput,
  EditButton,
} from '../styles'

class TicketEdition extends React.Component {
    state = {
        ticket: null
    }
    
    componentWillMount() {
        if (this.state.ticket === null) {
            this.setState({ ticket: this.props.ticketToEdit })
        }
    }

    handleTitleInput = (e) => {
      this.setState({ ticket: { ...this.state.ticket, title: e.target.value } })
    }

    handleStartInput = (e) => {       
      if(e.target.value.length < 1) { return null}
      let value = e.target.value;
      let start = convertYyyymmddThhmmToMls(value); 
      let end = this.state.ticket.to;
      this.setState({
        ticket: {
          ...this.state.ticket,
          from: convertYyyymmddThhmmToMls(value),
        }})
      if (start > end) {
        let newToValue = convertMlsToyyyymmddThhmm(convertYyyymmddThhmmToMls(new Date(start).setMinutes(59)))
        this.setState({
          ticket: {
            ...this.state.ticket,
            to:  convertYyyymmddThhmmToMls(newToValue),
            from: convertYyyymmddThhmmToMls(value),
          },
        });
      } else if (start < end && start + 3540000 > end) {
        let newToValue = convertMlsToyyyymmddThhmm(new Date(new Date(start + 10800000).setMinutes(59)))
        this.setState({
          ticket: {
            ...this.state.ticket,
            to: convertYyyymmddThhmmToMls(newToValue),
            from: convertYyyymmddThhmmToMls(value),
          },
        });
      }
    }

    handleEndInput = (e) => {
      if(e.target.value.length < 1) { return null}
      let value = e.target.value;
      let end = Date.parse(value);
      let start = Date.parse(this.state.ticket.from);
      this.setState({
        ticket: {
          ...this.state.ticket,
          to: new Date(e.target.value).valueOf(),
        },
      });
      if (end < start) {
        if (String(value).slice(8, 9) === "0" || String(value).slice(-5, -4) === "0") {                      
          setTimeout(() => {
            let end = Date.parse(this.state.ticket.to);
            let start = Date.parse(this.state.ticket.from);
            if (end < start) {
              let newFromValue = convertMlsToyyyymmddThhmm(new Date(new Date(end + 10800000).setMinutes(0)))
              this.setState({
                ticket: {
                  ...this.state.ticket,
                  from: convertYyyymmddThhmmToMls(newFromValue),
                },
              });
            }
          }, 1000);
        } else {
          let newFromValue = convertMlsToyyyymmddThhmm(new Date(new Date(end + 10800000).setMinutes(0)))
          this.setState({
            ticket: {
              ...this.state.ticket,
              from: convertYyyymmddThhmmToMls(newFromValue),
            },
          });
        }
      }
    }

    handleConfirmClick = (e) => {
        if (this.state.ticket.from < Date.parse(new Date())) {
          alert("NEW DATE CANNOT BE IN THE PAST!");
          return null;
        } else if (
          this.state.ticket.to < this.state.ticket.from
        ) {
          alert(
            "TERMINATION TIME CANNOT BE BEFORE COMMENCEMENT!"
          );
          return null;
        } else {
          this.props.editTicket(this.state.ticket, this.props.user)
          this.props.discardTicketToEdit()
        }
    }

    render() {
        return (
          <EditMain>
            <EditTitle>
                INPUT DATA YOU WISH TO AMEND. DISREGARD INPUTS YOU DO NOT
                INTEND TO ALTER.
            </EditTitle>
            <EditRow>
              <EditFirstColumn>
                EVENT TITLE:
              </EditFirstColumn>
              <div>
                {this.props.ticketToEdit.title}
              </div>
              <div>
                <EditInput
                  type="text"
                  value={this.state.ticket.title}
                  size="21"
                  onChange={this.handleTitleInput}
                />
              </div>
            </EditRow>
            <EditRow>
              <EditFirstColumn>
                COMMENCES at:
              </EditFirstColumn>
              <div>
                {String(new Date(this.props.ticketToEdit.from)).slice(3, 21)}
              </div>
              <div>
                <EditInput
                  type="datetime-local"
                  placeholder="Disregard to keep unaltered"
                  size="21"
                  value={ convertMlsToyyyymmddThhmm(this.state.ticket.from) }
                  min={ convertMlsToyyyymmddThhmm(new Date()) }  
                  onChange={this.handleStartInput}
                  required
                />
              </div>
            </EditRow>
            <EditRow>
              <EditFirstColumn>
                TERMINATES at:
              </EditFirstColumn>
              <div>
                {String(new Date(this.props.ticketToEdit.to)).slice(3, 21)}
              </div>
              <div>
                <EditInput
                  type="datetime-local"
                  placeholder="Disregard to keep unaltered"
                  size="21"
                  min={String(new Date().toISOString()).slice(0, -8)}
                  value={ convertMlsToyyyymmddThhmm(this.state.ticket.to)}
                  onChange={this.handleEndInput}
                  required
                />
              </div>
            </EditRow>
            <EditRow>
              <EditButton variant="contained" confirm='true' onClick={this.handleConfirmClick}>
                CONFIRM
              </EditButton>
              <EditButton variant="contained" onClick={this.props.discardTicketToEdit}>
                CANCEL
              </EditButton>
            </EditRow>
          </EditMain>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ticketToEdit: state.ticketToEdit,
        user: state.user,
    }
}
export default connect(mapStateToProps, {
    discardTicketToEdit, 
    editTicket, 
})(TicketEdition)