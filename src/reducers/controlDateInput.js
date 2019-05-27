import { CONTROL_DATE_INPUT} from '../actions/types';

const INITIAL_STATE = {
    dateInput: null,
};

export default (state = INITIAL_STATE, action) => {
    console.log('state from control', state)
    switch (action.type) {
        case CONTROL_DATE_INPUT:
        return {...state, dateInput: action.payload };
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