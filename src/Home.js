import React from 'react'
import UpperBar from './components/UpperBar'
import Guide from './components/Guide'
import Halls from './components/Halls'
import Schedule from './components/Schedule'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchTickets, fetchHalls } from './actions';
import './css/Home.css'
import CircularProgress from './components/CircularProgress';

class Home extends React.Component {
    
    componentWillMount() {
        (!this.props.tickets) && this.props.fetchTickets();
        (!this.props.halls) && this.props.fetchHalls();
    }

    render() {
        return (
            (!this.props.user)
                ?
                <div className='main'>
                    <UpperBar />
                    <Guide />
                    {(this.props.tickets && this.props.halls)
                        ?
                        <Schedule />
                        :
                        <div className="ciruclar-progress-container">
                            <CircularProgress />
                        </div>
                    }
                    {(this.props.halls)
                        ?
                        <Halls />
                        :
                        <div className="ciruclar-progress-container">
                            <CircularProgress />
                        </div>
                    }


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
        user: state.user
    }
}

export default connect(mapStateToProps,
    {
        fetchTickets,
        fetchHalls,
    })(Home);
