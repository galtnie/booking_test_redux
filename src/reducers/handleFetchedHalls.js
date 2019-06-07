import { FETCH_HALLS} from '../actions/types';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_HALLS:
        return action.payload;
        default: 
        return state;
    }
};
