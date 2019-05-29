import React from 'react';
import { connect } from 'react-redux';
import { 
    RedFreeHome, 
    VioletFreeHome, 
    BlueFreeHome, 
    GreenFreeHome, 
    RedBusyHome, 
    VioletBusyHome, 
    BlueBusyHome, 
    GreenBusyHome,   
} from './Rooms.js'




class RoomStatusDeterminer extends React.Component {

    // {this.props.hour}


    render() {
         switch(this.props.id.slice(25, 28)){
            case 'vio':
            return <VioletFreeHome id={this.props.id} />;
            case 'gre':
            return <GreenFreeHome id={this.props.id} />;
            case 'red':
            return <RedFreeHome id={this.props.id} />;
            case 'blu':
            return <BlueFreeHome id={this.props.id} />;
            default: 
            return 'R'
        }
    }
}


const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps
    return { id }; 
};
export default connect (mapStateToProps, {})(RoomStatusDeterminer);
