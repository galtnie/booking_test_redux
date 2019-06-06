import { FETCH_TICKETS,  ADD_NEW_TICKETS, WITHDRAW_TICKET} from '../actions/types';

export default (state = '', action) => {
    
    switch (action.type) {
        case FETCH_TICKETS:
        return action.payload;

        case ADD_NEW_TICKETS:
        let newList = []
        for (let i = 0; i < state.length; i++) {
            newList.push(state[i])
        }
        for (let i = 0; i < action.payload.length; i++){
            newList.push(action.payload[i])
        }
        return newList;

        case WITHDRAW_TICKET:
        console.log('BF', state.length)
        let phrase = JSON.stringify(action.payload)
        let text = JSON.stringify(state)
        
        console.log('phrase', phrase)
        console.log(text)

        let newList2 = text.replace(`${phrase},`, '')
        newList2 = JSON.parse(newList2)
        console.log('AF', newList2.length)

        console.log('NEW', JSON.parse(newList2))

        return JSON.parse(newList2);

        default: 
        return state;
    }
};
