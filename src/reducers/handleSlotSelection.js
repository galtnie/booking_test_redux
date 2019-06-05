import  { SELECT_SLOT, UNSELECT_SLOT, DISCARD_ALL_SELECTED_SLOTS } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case SELECT_SLOT:
        return [ ...state, action.payload ];
        case UNSELECT_SLOT:
        return state.filter(i => i !== action.payload);
        case DISCARD_ALL_SELECTED_SLOTS:
        return [];
        default: 
        return state;
    }
}