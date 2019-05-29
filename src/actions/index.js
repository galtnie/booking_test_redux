import axios from 'axios'

import { 
    ADD_COLOURS,
    HANDLE_DATE_INPUT_SUBMIT,
    UPPERBAR_BACKWARD_SWITCHER, 
    FETCH_HALLS,
    FETCH_TICKETS,
} from './types';

export const inputHallsAndTicketColours = () => {
    return ({
        type: ADD_COLOURS,
        payload: ['vio', 'gre', 'red', 'blu'],
    });
}

export const handleDateInputSubmit = (date) => {
    console.log('date action', date)
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
    dispatch({ 
        type: FETCH_HALLS, 
        payload: response.data 
    })
};

export const fetchTickets = () => async dispatch => {
    const res = await axios.get('https://web-ninjas.net/tickets')
    dispatch({ 
        type: FETCH_TICKETS, 
        payload: res.data 
    })
};




