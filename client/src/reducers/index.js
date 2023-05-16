import { combineReducers } from 'redux';
import flight from './flight';
import localisation from './localisation';

const rootReducer = combineReducers({
    flight,
    localisation
});

export default rootReducer;