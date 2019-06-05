import { FETCH_TICKETS} from '../actions/types';

export default (state = '', action) => {
    
    switch (action.type) {
        case FETCH_TICKETS:
        // console.log(action.payload)
        //     for (let i = 0; i < action.payload.length; i++) {
        // console.log('FROM ', new Date(action.payload[i].from))
        // console.log('TO ', new Date(action.payload[i].to))
        // console.log('TITLE ', action.payload[i].title)
    // }
        return action.payload;
        default: 
        return state;
    }
};
