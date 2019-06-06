import React from 'react';
import { connect } from 'react-redux';
import { checkIfSlotReserved, checkIfSlotSelected,  } from '../functions' 
import history from '../history'
import { selectSlot, unselectSlot, determineReservedSlots } from '../actions'
import { 
    RedFreeHome, 
    VioletFreeHome, 
    BlueFreeHome, 
    GreenFreeHome, 
    RedBusy, 
    VioletBusy, 
    BlueBusy, 
    GreenBusy,  
    RedFree, 
    VioletFree, 
    BlueFree, 
    GreenFree,
    RedChosen,
    VioletChosen,
    BlueChosen,
    GreenChosen,
} from './Rooms.js'

class RoomStatusDeterminer extends React.Component {

    // componentWillReceiveProps(newProps){
    //     console.log(newProps)
    // }

    render() {
        const reservedSlot = checkIfSlotReserved(this.props.reservedSlots, this.props.id)  
        if (history.location.pathname !== '/booking') {
            switch(this.props.id.slice(25, 28)){
                case 'vio':
                    return reservedSlot ? <VioletBusy id={reservedSlot}/> : <VioletFreeHome id={this.props.id} />;
                case 'gre':
                return reservedSlot ? <GreenBusy id={reservedSlot}/> : <GreenFreeHome id={this.props.id} />;
                case 'red':
                return reservedSlot ? <RedBusy id={reservedSlot}/> : <RedFreeHome id={this.props.id} />;
                case 'blu':
                return reservedSlot ? <BlueBusy id={reservedSlot}/> : <BlueFreeHome id={this.props.id} />;
                default: 
                return 'R'
            }
        } else {
        const selectedSlot = checkIfSlotSelected(this.props.selectedSlots, this.props.id)
            switch(this.props.id.slice(25, 28)){
                case 'vio':
                    return (
                        reservedSlot 
                            ? 
                            <VioletBusy id={reservedSlot}/> 
                            : 
                            (selectedSlot 
                                ?
                                <VioletChosen id={this.props.id} />
                                :
                                <VioletFree id={this.props.id} />
                            )
                    );
                case 'gre':
                    return (
                        reservedSlot 
                            ? 
                            <GreenBusy id={reservedSlot}/>
                            :
                            (selectedSlot
                                ?
                                <GreenChosen id={this.props.id} />
                                :
                                <GreenFree id={this.props.id} />
                            )
                    );
                    
                case 'red':
                    return (
                        reservedSlot 
                            ? 
                            <RedBusy id={reservedSlot}/> 
                            : 
                            (selectedSlot
                                ?
                                <RedChosen id={this.props.id} />
                                :
                                <RedFree id={this.props.id} />
                            )
                    );
                case 'blu':
                    return (
                        reservedSlot 
                            ? 
                            <BlueBusy id={reservedSlot}/> 
                            : 
                            (selectedSlot
                                ?
                                <BlueChosen id={this.props.id} />
                                :
                                <BlueFree id={this.props.id} />
                            )
                    );
                default: 
                return 'R'
            }
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
export default connect (mapStateToProps, {
    selectSlot,
    unselectSlot,
    determineReservedSlots,
})(RoomStatusDeterminer);
