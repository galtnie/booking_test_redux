import { FETCH_TICKETS,  ADD_NEW_TICKETS, WITHDRAW_TICKET, EDIT_TICKET } from '../actions/types';

export default (state = '', action) => {
    
    switch (action.type) {
        case FETCH_TICKETS:
        return action.payload;

        case ADD_NEW_TICKETS:
        let newList = [...state, ...action.payload]
        return newList;

        case WITHDRAW_TICKET:
        let newList2 = state.filter(i => i._id !== action.payload._id)
        return newList2;

        case EDIT_TICKET:
        let newList3 = state.filter(i => i._id !== action.payload._id)
        newList3 = [...newList3, action.payload]
        return newList3;

        default: 
        return state;
    }
};
