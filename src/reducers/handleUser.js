import  { STORE_USER, DISCARD_USER } from '../actions/types';

export default (state = null, action) => {
    switch (action.type) {
        case STORE_USER:
        return action.payload;
        case DISCARD_USER:
        return null
        default: 
        return state;
    }
}