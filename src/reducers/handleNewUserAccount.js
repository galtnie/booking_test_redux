import { HANDLE_NEW_USER_ACCOUNT } from '../actions/types';

export default (state = '', action) => {
    switch (action.type) {
        case HANDLE_NEW_USER_ACCOUNT:
        return action.payload;
        default:
        return state;    
    }
}
