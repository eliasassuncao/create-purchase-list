import {ACTION_TYPES} from "../constants";

export const addFoodListToShoppingList = (foodList) => (dispatch) => {
    dispatch({type: ACTION_TYPES.SHOPPING_LIST.ADD, payload: foodList});
}