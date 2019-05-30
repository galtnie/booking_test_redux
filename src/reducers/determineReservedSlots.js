import { DETERMINE_RESERVED_SLOTS } from '../actions/types';

export default (state = null, action) => {
    switch (action.type) {
        case DETERMINE_RESERVED_SLOTS:
        return action.payload;
        default:
        return state;    
    }
}
