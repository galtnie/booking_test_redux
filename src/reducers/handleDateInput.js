import { HANDLE_DATE_INPUT_SUBMIT, RESET_DATE } from '../actions/types';

export default (state = Date.parse(new Date()), action) => {
    switch (action.type) {
        case HANDLE_DATE_INPUT_SUBMIT:
        return action.payload;
        case RESET_DATE:
        return Date.parse(new Date());
        default: 
        return state;
    }
};
