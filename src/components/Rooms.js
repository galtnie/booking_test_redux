import React, { Component } from 'react';
import { selectSlot, unselectSlot } from '../actions';
import { connect } from 'react-redux';
import { RoomSlot, ReservedSlot } from '../styles';

export class FreeHome extends Component {
    render() {
        return <RoomSlot colour={this.props.id.slice(-3)}  id={this.props.id}>F</RoomSlot>;
    }
}

export class Busy extends Component {
    render() {   
        return <ReservedSlot 
                    colour={this.props.id ? this.props.id.slice(25, 28) : 'red'}
                    guide={this.props.guide} 
                    id={this.props.id} 
                    data-tooltip={this.props.id ? this.props.id.slice(34): null}>
                    R
                </ReservedSlot>;
    }
}

class Free_ extends Component {
    render() {
        return (        <RoomSlot 
            colour={this.props.id ? this.props.id.slice(25, 28) : 'red'} 
            guide={this.props.guide} 
            id={this.props.id}
            onClick={() => { this.props.selectSlot(this.props.id) }}
            hover
        >
            F
        </RoomSlot>
        );
    }
}
export const Free = connect(null, { selectSlot})(Free_)

class Chosen_ extends Component {
    render() {
        return <RoomSlot 
                colour={this.props.id ? this.props.id.slice(25, 28) : 'red'} 
                guide={this.props.guide} 
                id={this.props.id}
                chosen
                onClick={() => { this.props.unselectSlot(this.props.id) }}
        >S</RoomSlot>;
    }
}
export const Chosen = connect(null, { unselectSlot })(Chosen_)







































// import React, { Component } from 'react';
// import { selectSlot, unselectSlot } from '../actions';
// import '../css/Rooms.css';
// import { connect } from 'react-redux';

// export class RedFreeHome extends Component {
//     render() {
//         return <div className="red-room-free-home" id={this.props.id}>F</div>;
//     }
// }

// export class BlueFreeHome extends Component {
//     render() {
//         return <div className="blue-room-free-home" id={this.props.id}>F</div>;
//     }
// }

// export class GreenFreeHome extends Component {
//     render() {
//         return <div className="green-room-free-home" id={this.props.id}>F</div>;
//     }
// }

// export class VioletFreeHome extends Component {
//     render() {
//         return <div className="violet-room-free-home" id={this.props.id}>F</div>;
//     }
// }

// export class RedBusy extends Component {
//     render() {   
//         return <div className={`red-room-reserved${(this.props.guide)?'-guide':''}`} id={this.props.id} data-tooltip={this.props.id ? this.props.id.slice(34): null} >R</div>;
//     }
// }

// export class BlueBusy extends Component {
//     render() {
//         return <div className="blue-room-reserved" id={this.props.id} data-tooltip={this.props.id ? this.props.id.slice(34): null}>R</div>;
//     }
// }

// export class GreenBusy extends Component {
//     render() {
//         return <div className="green-room-reserved" id={this.props.id} data-tooltip={this.props.id ? this.props.id.slice(34): null} >R</div>;
//     }
// }

// export class VioletBusy extends Component {
//     render() {
//         return <div className="violet-room-reserved" id={this.props.id} data-tooltip={this.props.id ? this.props.id.slice(34): null} >R</div>;
//     }
// }


// class RedFree_ extends Component {
//     render() {
//         return <div className={`red-room-free${(this.props.guide)?'-guide':''}`} id={this.props.id}
//             onClick={() => { this.props.selectSlot(this.props.id) }}
//         >F</div>;
//     }
// }


// export const RedFree = connect(null, { selectSlot})(RedFree_)

// class BlueFree_ extends Component {
//     render() {
//         return <div className="blue-room-free" id={this.props.id}
//             onClick={() => { this.props.selectSlot(this.props.id) }}
//         >F</div>;
//     }
// }
// export const BlueFree = connect(null, { selectSlot})(BlueFree_)

// class GreenFree_ extends Component {
//     render() {
//         return <div className="green-room-free" id={this.props.id}
//             onClick={() => { this.props.selectSlot(this.props.id) }}
//         >F</div>;
//     }
// }
// export const GreenFree = connect(null, { selectSlot})(GreenFree_)

// class VioletFree_ extends Component {
//     render() {
//         return <div className="violet-room-free" id={this.props.id}
//             onClick={() => { this.props.selectSlot(this.props.id) }}
//         >F</div>;
//     }
// }
// export const VioletFree = connect(null, { selectSlot})(VioletFree_)



// class RedChosen_ extends Component {
//     render() {
//         return <div className={`red-room-chosen${(this.props.guide)?'-guide':''}`} id={this.props.id}
//             onClick={() => { this.props.unselectSlot(this.props.id) }}
//         >S</div>;
//     }
// }



// export const RedChosen = connect(null, { unselectSlot })(RedChosen_)

// class BlueChosen_ extends Component {
//     render() {
//         return <div className="blue-room-chosen" id={this.props.id}
//             onClick={() => { this.props.unselectSlot(this.props.id) }}
//         >S</div>;
//     }
// }
// export const BlueChosen = connect(null, { unselectSlot })(BlueChosen_)

// class GreenChosen_ extends Component {
//     render() {
//         return <div className="green-room-chosen" id={this.props.id}
//             onClick={() => { this.props.unselectSlot(this.props.id) }}
//         >S</div>;
//     }
// }
// export const GreenChosen = connect(null, { unselectSlot })(GreenChosen_)

// class VioletChosen_ extends Component {
//     render() {
//         return <div className="violet-room-chosen" id={this.props.id}
//             onClick={() => { this.props.unselectSlot(this.props.id) }}
//         >S</div>;
//     }
// }
// export const VioletChosen = connect(null, { unselectSlot })(VioletChosen_)