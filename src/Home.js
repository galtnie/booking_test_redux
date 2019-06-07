import React from 'react'
import UpperBar from './components/UpperBar'
import Guide from './components/Guide'
import Halls from './components/Halls'
import Schedule from './components/Schedule'
import Title from './components/Title'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchTickets, fetchHalls, determineReservedSlots } from './actions';
import './css/Home.css'
import CircularProgress from './components/CircularProgress';
import { calculateReservedSlots } from './functions'

class Home extends React.Component {
    

    componentWillMount() {
        this.props.fetchTickets();
        this.props.fetchHalls();
        this.props.determineReservedSlots(calculateReservedSlots(this.props.tickets, this.props.halls, this.props.dateInput))
    }

    render() {
        return (
            (!this.props.user)
                ?
                <div className='main'>
                    <UpperBar />
                    <Title />
                    <Guide />
                    {(this.props.halls) ? <Halls /> : <CircularProgress /> }
                    {(this.props.tickets && this.props.halls) ? <Schedule /> : <CircularProgress />}
                </div>
                :
                <Redirect to='/booking' />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tickets: state.tickets,
        halls: state.halls,
        user: state.user,
        dateInput: state.dateInput,
    }
}

export default connect(mapStateToProps,
    {
        determineReservedSlots,
        fetchTickets,
        fetchHalls,
    })(Home);
