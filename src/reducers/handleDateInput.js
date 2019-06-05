import { HANDLE_DATE_INPUT_SUBMIT} from '../actions/types';

export default (state = new Date(), action) => {
    switch (action.type) {
        case HANDLE_DATE_INPUT_SUBMIT:
        return action.payload;
        default: 
        return state;
    }
};
