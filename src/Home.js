import React from 'react'
import UpperBar from './components/UpperBar'
import Guide from './components/Guide'
import Halls from './components/Halls'
import Schedule from './components/Schedule'
import Title from './components/Title'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchTickets, fetchHalls, determineReservedSlots, eraseNewUserAccount } from './actions';
import CircularProgress from './components/CircularProgress';
import { calculateReservedSlots } from './functions'
import { Wrapper } from './styles'

class Home extends React.Component {
    componentWillMount() {
        this.props.fetchTickets();
        this.props.fetchHalls();
        if (this.props.tickets && this.props.halls) {
            this.props.determineReservedSlots(calculateReservedSlots(this.props.tickets, this.props.halls, this.props.dateInput))
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tickets !== this.props.tickets || nextProps.halls !== this.props.halls){  
            if (this.props.tickets && this.props.halls) {
                this.props.determineReservedSlots(calculateReservedSlots(this.props.tickets, this.props.halls, this.props.dateInput))
                this.forceUpdate()
            }
        }
    }

    componentDidMount(){
        if (this.props.newUser) {this.props.eraseNewUserAccount()} 
    }

    render() {
           return (
            (!this.props.user)
                ?
                <Wrapper>
                    <UpperBar />
                    <Title />
                    
                    {(this.props.halls) ? <Halls /> : <CircularProgress /> }
                    <Guide />
                    {(this.props.tickets && this.props.halls) ? <Schedule /> : <CircularProgress />}
                   
                </Wrapper>
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
        newUser : state.newUserAccount
    }
}

export default connect(mapStateToProps,
    {
        determineReservedSlots,
        fetchTickets,
        fetchHalls,
        eraseNewUserAccount,
    } )(Home);
