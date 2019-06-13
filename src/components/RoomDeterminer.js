import React from 'react';
import { connect } from 'react-redux';
import { checkIfSlotReserved, checkIfSlotSelected, } from '../functions'
import history from '../history'
import { selectSlot, unselectSlot, determineReservedSlots } from '../actions'
import { FreeHome, Free, Busy, Chosen } from './Rooms.js'

class RoomStatusDeterminer extends React.Component {
    render() {
        const reservedSlot = checkIfSlotReserved(this.props.reservedSlots, this.props.id)
        if (history.location.pathname !== '/booking') {
            return reservedSlot ? <Busy id={reservedSlot} /> : <FreeHome id={this.props.id} />;
        } else {
            const selectedSlot = checkIfSlotSelected(this.props.selectedSlots, this.props.id)
            return (
                reservedSlot
                    ?
                    <Busy id={reservedSlot} />
                    :
                    (selectedSlot
                        ?
                        <Chosen id={this.props.id} />
                        :
                        <Free id={this.props.id} />
                    )
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps
    let reservedSlots = state.reservedSlots
    let selectedSlots = state.selectedSlots
    let dateInput = state.dateInput
    let tickets = state.tickets
    let halls = state.halls
    return { id, reservedSlots, selectedSlots, dateInput, tickets, halls };
};
export default connect(mapStateToProps, {
    selectSlot,
    unselectSlot,
    determineReservedSlots,
})(RoomStatusDeterminer);
