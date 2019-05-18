import {combineReducers} from 'redux';
import systemSettingsReducer from './systemSettingsReducer'
import shoppingListReducer from './shoppingListReducer';

const rootReducer = combineReducers({
    systemSettings: systemSettingsReducer,
    shoppingList: shoppingListReducer,
});

export default rootReducer;