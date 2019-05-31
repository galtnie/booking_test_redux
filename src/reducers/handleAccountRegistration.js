import { INVOKE_FAILED_REGISTRATION_ERROR, REGISTER_ACCOUNT } from '../actions/types';

export const registrationError =  (state = null, action) => {
    switch (action.type) {
        case INVOKE_FAILED_REGISTRATION_ERROR:
        return action.payload;
        default:
        return state;    
    }
}

export const registerAccount =  (state = null, action) => {
    switch (action.type) {
        case REGISTER_ACCOUNT:
        return action.payload;
        default:
        return state;
    }
} 
