import  { SET_TICKET_TO_EDIT, DISCARD_TICKET_TO_EDIT } from '../actions/types';

export default (state = null, action) => {
    switch (action.type) {
        case SET_TICKET_TO_EDIT:
        return action.payload;
        case DISCARD_TICKET_TO_EDIT:
        return null;
        default: 
        return state;
    }
}