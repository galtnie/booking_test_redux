import axios from 'axios';

import { 
    HANDLE_DATE_INPUT_SUBMIT,
    UPPERBAR_BACKWARD_SWITCHER, 
    FETCH_HALLS,
    FETCH_TICKETS,
    DETERMINE_RESERVED_SLOTS,
    HANDLE_NEW_USER_ACCOUNT,
    VALIDATE_USER,
    DISCARD_USER,
    SELECT_SLOT,
    UNSELECT_SLOT,
    DISCARD_ALL_SELECTED_SLOTS,
    DETERMINE_USERS_PRIOR_RESERVATIONS,
    SET_TICKET_TO_EDIT,
    DISCARD_TICKET_TO_EDIT,
    ADD_NEW_TICKETS,
    WITHDRAW_TICKET,
    EDIT_TICKET,
    RESET_DATE,
    RENDER_LOGIN_SERVER_ERROR,
    ERASE_LOGIN_SERVER_ERROR,
} from './types';

export const handleDateInputSubmit = (date) => {
    if (typeof date === 'string') {
        date = Date.parse(date)
    }
    return ({ 
        type: HANDLE_DATE_INPUT_SUBMIT, 
        payload: date
    })
} 

export const resetDate = () => {
    return ({
        type: RESET_DATE,
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

export const validateUser = (res) => async dispatch => {
    console.log('it worked')
    let error = null;
    const response = await axios.post('https://web-ninjas.net/signIn',
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    {
      data: {
        email: res.email.toLowerCase(),
        password: res.password
      }
    }
    ).catch(e => {
        error = e
    })
    error !== null 
        ? 
        dispatch({
            type: RENDER_LOGIN_SERVER_ERROR,
            payload: error.response.data.message
        })
        :
        dispatch({ 
            type: VALIDATE_USER, 
            payload: response.data 
        })
};

export const eraseLoginServerError = () => {
    return ({
        type: ERASE_LOGIN_SERVER_ERROR
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

export const setTicketToEdit = (ticket) => {
    return ({
        type: SET_TICKET_TO_EDIT,
        payload: ticket
    })
}

export const discardTicketToEdit = () => {
    return ({
        type: DISCARD_TICKET_TO_EDIT
    })
}

export const createNewTicket = (tickets, user) => dispatch => {

        let axiosRequests = []
        for (let i = 0; i < tickets.length; i++) {
            let request = axios({
                method: 'post',
                url: 'https://web-ninjas.net/tickets',
                data: {
                    hall_id: tickets[i].hall_id,
                    user_id: user._id,
                    title: tickets[i].title,
                    from: tickets[i].from,
                    to: tickets[i].to,
                },
                headers: {
                    ContentType: "application/x-www-form-urlencoded",
                    Authorization: user.token,
                }
            })
            axiosRequests.push(request)
        }
        
        Promise.all(axiosRequests)
            .then((res)=>{
                let newArray = []
                for (let i = 0; i < res.length; i++) {
                                         
                    newArray.push(JSON.parse(JSON.stringify(res[i].data)))
                }
                return newArray
            })
            .then(arr => {
                dispatch({ 
                    type: ADD_NEW_TICKETS, 
                    payload: arr 
                })
            })
            .catch(error => {
                console.dir(error)
                console.log(error.message)
            })
}

export const withdrawTicket = (ticket, user) =>  dispatch => {
    axios({
        method: 'delete',
        url: `https://web-ninjas.net/tickets/${ticket._id}`,
        headers: {
            ContentType: "application/x-www-form-urlencoded",
            Authorization: user.token,
        }
    })
    .then(()=>{
        dispatch({ 
            type: WITHDRAW_TICKET, 
            payload: ticket 
        })
    })
    .catch((e) => console.dir(e))
}

export const editTicket = (ticket, user) => dispatch => {

    axios({
        method: 'put',
        url: `https://web-ninjas.net/ticket/${ticket._id}`,
        headers: {
            ContentType: "application/x-www-form-urlencoded",
            Authorization: user.token,
        },
        data: {
            title: ticket.title,
            from:  ticket.from,
            to: ticket.to,
        }
    })
    .then(()=>{
        dispatch({ 
            type: EDIT_TICKET, 
            payload: ticket 
        })
    })
    .catch((e) => console.dir(e))
}

