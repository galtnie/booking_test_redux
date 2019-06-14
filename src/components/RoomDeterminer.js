import React from 'react';
import { connect } from 'react-redux';
import { checkIfSlotReserved, checkIfSlotSelected, } from '../functions'
import { selectSlot, unselectSlot, determineReservedSlots } from '../actions'
import { FreeHome, Free, Busy, Chosen } from './Rooms.js'

class RoomStatusDeterminer extends React.Component {
    render() {
        const reservedSlot = checkIfSlotReserved(this.props.reservedSlots, this.props.id)
        
        if (this.props.user === null) {
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
    const reservedSlots = state.reservedSlots
    const selectedSlots = state.selectedSlots
    const dateInput = state.dateInput
    const tickets = state.tickets
    const halls = state.halls
    const user = state.user
    return { id, reservedSlots, selectedSlots, dateInput, tickets, halls, user };
};
export default connect(mapStateToProps, {
    selectSlot,
    unselectSlot,
    determineReservedSlots,
})(RoomStatusDeterminer);
