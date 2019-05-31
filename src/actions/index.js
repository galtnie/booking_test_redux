import axios from 'axios';
import history from '../history';

import { 
    HANDLE_DATE_INPUT_SUBMIT,
    UPPERBAR_BACKWARD_SWITCHER, 
    FETCH_HALLS,
    FETCH_TICKETS,
    DETERMINE_RESERVED_SLOTS,
    REGISTER_ACCOUNT,
    INVOKE_FAILED_REGISTRATION_ERROR,
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

export const registerAccount = (email, password) => async dispatch => {
    console.log(email, password)

    let err
    const res = await axios.post('https://web-ninjas.net/signUp',
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
        { data: { email, password } }
    ).catch(e => err = e )

    if (err) {
        console.log(err.response.data.errors.errors)
 
        dispatch({
            type: INVOKE_FAILED_REGISTRATION_ERROR,
            payload: err.response.data.errors.errors
        })

    } else {
        console.log("RES", res)
        
        history.push('/login');

        // dispatch({
        //             type: REGISTER_ACCOUNT,
        //             payload: res
        //         })
    }
 

    // if (res.message) {
        // dispatch({
        //     type: INVOKE_FAILED_REGISTRATION_ERROR,
        //     payload: 'This email is already registered. Enter a unique one.'
        // })
    // } else {
    //     dispatch({
    //         type: REGISTER_ACCOUNT,
    //         payload: res
    //     })
    // }
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

