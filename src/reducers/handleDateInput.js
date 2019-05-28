import { HANDLE_DATE_INPUT_SUBMIT} from '../actions/types';

export default (state = '', action) => {
    switch (action.type) {
        case HANDLE_DATE_INPUT_SUBMIT:
        return action.payload;
        default: 
        return state;
    }
};








// import { SIGN_IN, SIGN_OUT } from '../actions/types';

// const INITIAL_STATE= {
//     isSignedIn: null,
//     userId: null
// };

// export default (state = INITIAL_STATE, action) =>  {
//     switch (action.type) {
//         case SIGN_IN:
//             return {...state, isSignedIn: true, userId: action.payload};
//         case SIGN_OUT:
//             return {...state, isSignedIn: false, userId: null};
//         default: 
//             return state;

//     }
// };

