import  { SELECT_SLOT, UNSELECT_SLOT } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case SELECT_SLOT:
        return [ ...state, action.payload ];
        case UNSELECT_SLOT:
        return state.filter(i => i !== action.payload);
        default: 
        return state;
    }
}