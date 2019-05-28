import { UPPERBAR_BACKWARD_SWITCHER } from '../actions/types';

export default (state = false, action) => {
    switch (action.type) {
        case UPPERBAR_BACKWARD_SWITCHER:
        return action.payload;
        default: 
        return state;
    }
};
