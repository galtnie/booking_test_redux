import { HANDLE_DATE_INPUT_SUBMIT} from '../actions/types';

const INITIAL_STATE = {
    dateInput: null,
};

export default (state = INITIAL_STATE, action) => {
    console.log('state from handle', state)
    switch (action.type) {
        case HANDLE_DATE_INPUT_SUBMIT:
        return  {...state, send: true};
        default: 
        return state;
    }
};


