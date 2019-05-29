import { ADD_COLOURS } from '../actions/types';

export default (state=[], action) =>  {
    switch (action.type) {
        case ADD_COLOURS:
        return action.payload;
        default: 
        return state;
    }
}