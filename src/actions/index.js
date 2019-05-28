import { 
    HANDLE_DATE_INPUT_SUBMIT,
    UPPERBAR_BACKWARD_SWITCHER, 
} from './types';


export const handleDateInputSubmit = (date) => {
    console.log('date action', date)
    return ({ 
        type: HANDLE_DATE_INPUT_SUBMIT, 
        payload: date
    })
} 

export const handleUpperBackSwitcher = (status) => {
    return ({
        type: UPPERBAR_BACKWARD_SWITCHER,
        payload: status
    })
}