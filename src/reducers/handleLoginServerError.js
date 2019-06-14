import { RENDER_LOGIN_SERVER_ERROR, ERASE_LOGIN_SERVER_ERROR } from '../actions/types';

export default (state = null, action) => {
    switch (action.type) {
        case RENDER_LOGIN_SERVER_ERROR:
        return action.payload;
        case ERASE_LOGIN_SERVER_ERROR:
        return null;
        default: 
        return state;
    }
};




