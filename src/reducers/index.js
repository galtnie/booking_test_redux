import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form'

import handleDateInput from './handleDateInput'
import handleBackSwitcher from './handleBackSwitcher'
import handleFetchedHalls from './handleFetchedHalls'
import handleFetchedTickets from './handleFetchedTickets'
import determineReservedSlots from './determineReservedSlots';
import handleNewUserAccount from './handleNewUserAccount';
import handleUser from './handleUser'
import handleSlotSelection from './handleSlotSelection';
import determineUsersPriorReservations from './determineUsersPriorReservations';

export default combineReducers({
    
    dateInput: handleDateInput,
    backSwitcher: handleBackSwitcher,
    halls: handleFetchedHalls,
    tickets: handleFetchedTickets,
    reservedSlots: determineReservedSlots,
    form: formReducer,
    newUserAccount: handleNewUserAccount,
    user: handleUser,
    selectedSlots: handleSlotSelection,
    usersPriorReservations: determineUsersPriorReservations,
});

