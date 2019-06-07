import React from 'react'
import { connect } from 'react-redux'
import { discardTicketToEdit, editTicket } from '../actions'
import '../css/TicketEdition.css'
import { convertMlsToyyyymmddThhmm, convertYyyymmddThhmmToMls } from '../functions'

class TicketEdition extends React.Component {
    state = {
        ticket: null
    }
    componentWillMount() {
        if (this.state.ticket === null) {
            this.setState({ ticket: this.props.ticketToEdit })
        }
    }
    render() {
        return (
          <div className="ticket_edition-main">
            <div>
              <h3>
                INPUT DATA YOU WISH TO AMEND. DISREGARD INPUTS YOU DON'T
                INTEND TO ALTER.
              </h3>
            </div>
            <div className="ticket_edition-data-row">
              <div className="ticket_edition-first-column">
                EVENT TITLE:
              </div>
              <div>{this.props.ticketToEdit.title}</div>
              <div>
                <input
                  type="text"
                  value={this.state.ticket.title}
                  size="21"
                  className="ticket_edition-input"
                  onChange={e =>
                    this.setState({
                      ticket: {
                        ...this.state.ticket,
                        title: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
            <div className="ticket_edition-data-row">
              <div className="ticket_edition-first-column">
                COMMENCES at:
              </div>
              <div>
                {String(new Date(this.props.ticketToEdit.from)).slice(3, 21)}
              </div>
              <div>
                <input
                  type="datetime-local"
                  placeholder="Disregard to keep unaltered"
                  size="21"
                  className="ticket_edition-input"
                  value={ convertMlsToyyyymmddThhmm(this.state.ticket.from) }
                  min={ convertMlsToyyyymmddThhmm(new Date()) }  
                  onChange={e => {                   
                    if(e.target.value.length < 1) { return null}
                    let value = e.target.value;
                    let start = convertYyyymmddThhmmToMls(value); //mls
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
                  }}
                  required
                />
              </div>
            </div>
            <div className="ticket_edition-data-row">
              <div className="ticket_edition-first-column">
                TERMINATES at:
              </div>
              <div>
                {String(new Date(this.props.ticketToEdit.to)).slice(3, 21)}
              </div>
              <div>
                <input
                  type="datetime-local"
                  placeholder="Disregard to keep unaltered"
                  size="21"
                  className="ticket_edition-input"
                  min={String(new Date().toISOString()).slice(0, -8)}
                  value={ convertMlsToyyyymmddThhmm(this.state.ticket.to)}
                  onChange={e => {
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
                  }}
                  required
                />
              </div>
            </div>
            <div className="ticket_edition-data-row">
              <button
                className="edit-button ui purple button"
                style={{ background: "#574AE2" }}
                onClick={e => {
                  if (
                    this.state.ticket.from < Date.parse(new Date())) {
                    e.preventDefault();
                    alert("NEW DATE CANNOT BE IN THE PAST!");
                    return null;

                  } else if (
                    this.state.ticket.to < this.state.ticket.from
                  ) {
                    alert(
                      "TERIMNATION TIME CANNOT BE BEFORE COMMENCEMENT!"
                    );
                    return null;
                  } else {
                    this.props.editTicket(this.state.ticket, this.props.user)
                    this.props.discardTicketToEdit()
                  }
                }}
              >
                <span className="button-text">Confirm</span>
              </button>
              <button
                className="edit-button ui button"
                style={{ background: "#222A68", color: "white" }}
                onClick={() => {
                  this.props.discardTicketToEdit()
                }}
              >
                <span className="button-text">Cancel</span>
              </button>
            </div>
          </div>
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