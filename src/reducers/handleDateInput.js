import { HANDLE_DATE_INPUT_SUBMIT, RESET_DATE } from '../actions/types';

export default (state = new Date(), action) => {
    switch (action.type) {
        case HANDLE_DATE_INPUT_SUBMIT:
        return action.payload;
        case RESET_DATE:
        return new Date();
        default: 
        return state;
    }
};
