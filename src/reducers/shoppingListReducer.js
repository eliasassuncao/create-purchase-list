import {ACTION_TYPES} from "../constants";

const initial = {
    foodList: {}
};

export default (state = initial, action) => {
    switch (action.type) {
        case ACTION_TYPES.SHOPPING_LIST.ADD:
            return {
                ...state,
                foodList: action.payload
            };
        case ACTION_TYPES.SHOPPING_LIST.CHANGE_STATUS:
            let index = action.payload.index;
            let status = action.payload.status;
            return {
                ...state,
                foodList: {
                    ...state.foodList,
                    [index]: {
                        ...state.foodList[index],
                        placed: status
                    }
                }
            }
        case ACTION_TYPES.SHOPPING_LIST.CLEAN:
            return {
                ...state,
                foodList: {}
            };
            case ACTION_TYPES.SHOPPING_LIST.REMOVE:
                return {
                    ...state,
                    foodList: action.payload
                }
        default:
            return state
    }
}