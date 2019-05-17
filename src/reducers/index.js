import {combineReducers} from 'redux';
import systemSettingsReducer from './systemSettingsReducer'

const rootReducer = combineReducers({
    systemSettings: systemSettingsReducer,
});

export default rootReducer;