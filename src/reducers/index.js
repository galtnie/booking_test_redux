import { combineReducers } from 'redux';
// import { reducer as formReducer} from 'redux-form'

import handleDateInput from './handleDateInput'
import handleBackSwitcher from './handleBackSwitcher'


export default combineReducers({
    dateInput: handleDateInput,
    backSwitcher: handleBackSwitcher,
});