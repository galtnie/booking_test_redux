import React from 'react';
import { connect } from 'react-redux';
import { checkSlot } from '../functions'
import { 
    RedFreeHome, 
    VioletFreeHome, 
    BlueFreeHome, 
    GreenFreeHome, 
    RedBusy, 
    VioletBusy, 
    BlueBusy, 
    GreenBusy,   
} from './Rooms.js'


class RoomStatusDeterminer extends React.Component {
    render() {

        const slot = checkSlot(this.props.reservedSlots, this.props.id)  
        const reserved = slot ?  true : false
        switch(this.props.id.slice(25, 28)){
            case 'vio':
                return reserved ? <VioletBusy id={slot}/> : <VioletFreeHome id={this.props.id} />;
            case 'gre':
            return reserved ? <GreenBusy id={slot}/> : <GreenFreeHome id={this.props.id} />;
            case 'red':
            return reserved ? <RedBusy id={slot}/> : <RedFreeHome id={this.props.id} />;
            case 'blu':
            return reserved ? <BlueBusy id={slot}/> : <BlueFreeHome id={this.props.id} />;
            default: 
            return 'R'
        }
    }
}


const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps
    const reservedSlots = state.reservedSlots
    return { id, reservedSlots }; 
};
export default connect (mapStateToProps, {})(RoomStatusDeterminer);
