import { HANDLE_NEW_USER_ACCOUNT } from '../actions/types';

const initialState = {
    email: '',
    password: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case HANDLE_NEW_USER_ACCOUNT:
        return action.payload;
        default:
        return state;    
    }
}
