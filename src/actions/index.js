import axios from 'axios';

import { 
    HANDLE_DATE_INPUT_SUBMIT,
    UPPERBAR_BACKWARD_SWITCHER, 
    FETCH_HALLS,
    FETCH_TICKETS,
    DETERMINE_RESERVED_SLOTS,
    HANDLE_NEW_USER_ACCOUNT,
    STORE_USER,
    DISCARD_USER,
    SELECT_SLOT,
    UNSELECT_SLOT,
    DISCARD_ALL_SELECTED_SLOTS,
    DETERMINE_USERS_PRIOR_RESERVATIONS,
} from './types';

export const handleDateInputSubmit = (date) => {
    return ({ 
        type: HANDLE_DATE_INPUT_SUBMIT, 
        payload: date
    })
} 

export const handleUpperBackSwitcher = (status) => {
    return ({
        type: UPPERBAR_BACKWARD_SWITCHER,
        payload: status
    })
}

export const fetchHalls = () => async dispatch => {
    const response = await axios.get('https://web-ninjas.net/halls')
    const array = JSON.parse(JSON.stringify(response))
    
    for (let i = 0; i < array.data.halls.length; i++ ) {
        switch (i) {
            case 0:
            array.data.halls[i].colour = 'vio';
            break;
            case 1:
            array.data.halls[i].colour = 'gre';
            break;
            case 2:
            array.data.halls[i].colour = 'red';
            break;
            case 3:
            array.data.halls[i].colour = 'blu';
            break;
            default:
            array.data.halls[i].colour = ''             
            break;
        }        
    }  
    dispatch({ 
        type: FETCH_HALLS, 
        payload: array.data.halls 
    })
};

export const fetchTickets = () => async dispatch => {
    const res = await axios.get('https://web-ninjas.net/tickets')
    dispatch({ 
        type: FETCH_TICKETS, 
        payload: res.data 
    })
};

export const determineReservedSlots = (reservedSlots) => {
    return ({
        type: DETERMINE_RESERVED_SLOTS,
        payload: reservedSlots
    })
}

export const createNewUserAccount = (email) => {
    return ({
        type: HANDLE_NEW_USER_ACCOUNT,
        payload: email
    })
}

export const eraseNewUserAccount = () => {
    return ({
        type: HANDLE_NEW_USER_ACCOUNT,
        payload: ''
    })
}

export const storeUser = (res) => {
      return ({
        type: STORE_USER,
        payload: res
    })
}

export const discardUser = () => {
    return ({
      type: DISCARD_USER,
  })
}

export const selectSlot = (slot_id) => {
    return ({
        type: SELECT_SLOT,
        payload: slot_id       
    })
}

export const unselectSlot = (slot_id) => {
    return ({
        type: UNSELECT_SLOT,
        payload: slot_id
    })
}

export const discardAllSelectedSlots = () => {
    return ({
      type: DISCARD_ALL_SELECTED_SLOTS,
  })
}

export const determineUsersPriorReservations = (tickets, user_id) => {
    return ({
        type: DETERMINE_USERS_PRIOR_RESERVATIONS,
        payload: tickets.filter((e)=>e.user_id === user_id)
    }) 
}

export const alterUsersPriorReservationsList = (newList) => {
    return ({
        type: DETERMINE_USERS_PRIOR_RESERVATIONS,
        payload: newList
    })
}