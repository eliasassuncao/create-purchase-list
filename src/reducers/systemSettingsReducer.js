import {ACTION_TYPES} from "../constants";

const initial = {
    menuMobileIsOpen: false,
    menuLargeIsOpen: false,
    countLoadingRequest: 0
};

export default (state = initial, action) => {
    switch (action.type) {
        case ACTION_TYPES.SIDE_MENU.MD_UP_MENU:
            return {
                ...state,
                menuMobileIsOpen: !state.menuMobileIsOpen
            };
        case ACTION_TYPES.SIDE_MENU.SM_DOWN_MENU:
            return {
                ...state,
                menuLargeIsOpen: !state.menuLargeIsOpen
            };
        case ACTION_TYPES.LOADING:
            let countLoadingRequest = state.countLoadingRequest;

            if (action.payload) {
                countLoadingRequest++
            } else if (!action.payload && countLoadingRequest > 0) {
                countLoadingRequest--
            }

            return {
                ...state,
                countLoadingRequest: countLoadingRequest
            };
        default:
            return state
    }
}