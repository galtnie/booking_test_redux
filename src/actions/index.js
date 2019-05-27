import { CONTROL_DATE_INPUT,  HANDLE_DATE_INPUT_SUBMIT } from './types';

export const controlDateInput = (value) => {
    return {
        type: CONTROL_DATE_INPUT,
        payload: value
    };
};

export const handleDateInputSubmit = () => {
    return {
        type: HANDLE_DATE_INPUT_SUBMIT
    }
}