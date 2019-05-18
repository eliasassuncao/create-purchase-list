import {ACTION_TYPES} from "../constants";

const initial = {
    shoopingList: []
};

export default (state = initial, action) => {
    switch (action.type) {
        case ACTION_TYPES.SHOPPING_LIST.ADD:
            return {
                ...state,
                shoopingList: [
                    ...state.shoopingList,
                    ...action.payload
                ]
            }
        case ACTION_TYPES.SHOPPING_LIST.ADD:
            return {
                ...state,
                shoopingList: action.payload
            };
        case ACTION_TYPES.SHOPPING_LIST.CLEAN:
            return {
                ...state,
                shoopingList: initial
            };
        default:
            return state
    }
}