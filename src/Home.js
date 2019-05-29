import React from 'react'
import ButtonAppBar from './components/UpperBar'
import HomeGuide from './components/HomeGuide'
import Halls from './components/Halls'
import Schedule from './components/Schedule'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { inputHallsAndTicketColours, fetchTickets, fetchHalls} from './actions';
import './css/Home.css'

class Home extends React.Component {

    componentWillMount() {
        this.props.inputHallsAndTicketColours();
        this.props.fetchTickets();
        this.props.fetchHalls();
    }

    render() {
        return (
            (typeof sessionStorage.getItem('LoggedIn') !== "string")
                ?
                <div className='main'>
                    <ButtonAppBar />    
                    <HomeGuide />
                    <Schedule />
                    <Halls />
                </div>
                :
                <Redirect to='/booking' />
        );
    }
}

export default connect (null, 
    { 
        inputHallsAndTicketColours, 
        fetchTickets, 
        fetchHalls
    })(Home);