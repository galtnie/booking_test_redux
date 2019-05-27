import { combineReducers } from 'redux';
// import { reducer as formReducer} from 'redux-form'
import controlDateInput from './controlDateInput'
import handleDateInputSubmit from './handleDateInputSubmit'




export default combineReducers({
    controlDateInput,
    handleDateInputSubmit,
});