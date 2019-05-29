import { combineReducers } from 'redux';
// import { reducer as formReducer} from 'redux-form'

import handleDateInput from './handleDateInput'
import handleBackSwitcher from './handleBackSwitcher'
import handleFetchedHalls from './handleFetchedHalls'
import inputHallsAndTicketColours from './inputHallsAndTicketColours'
import handleFetchedTickets from './handleFetchedTickets'

export default combineReducers({
    
    dateInput: handleDateInput,
    backSwitcher: handleBackSwitcher,
    halls: handleFetchedHalls,
    colours: inputHallsAndTicketColours,
    tickets: handleFetchedTickets,
});

