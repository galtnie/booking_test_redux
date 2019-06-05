import { DETERMINE_USERS_PRIOR_RESERVATIONS } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case DETERMINE_USERS_PRIOR_RESERVATIONS:
        return action.payload;
        default:
        return state;    
    }
}
