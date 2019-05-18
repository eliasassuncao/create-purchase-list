import {ACTION_TYPES} from "../constants";
import _ from 'lodash';

export const addFoodListToShoppingList = (newFood) => (dispatch, getState) => {
    if(_.isEmpty(newFood)){
        return
    }
    const {shoppingList: {foodList}} = getState();
    let newArr = [];
    _.map(foodList, food => newArr.push(food));
    _.map(newFood, food => newArr.push(food));
    console.log(newArr)
    dispatch({type: ACTION_TYPES.SHOPPING_LIST.ADD, payload: newArr});
}

export const changeStatusFood = (status, index) => (dispatch) => {
    dispatch({type: ACTION_TYPES.SHOPPING_LIST.CHANGE_STATUS, payload: {status: status, index: index}})
}

export const resetShoppingList = () => (dispatch) => {
    dispatch({type: ACTION_TYPES.SHOPPING_LIST.CLEAN, payload: {}})
}

export const removeFood = (id) => (dispatch, getState) => {
    const {shoppingList: {foodList}} = getState();
    let newFoodList = _.remove(_.map(foodList), food => food.id !== id)
    dispatch({type: ACTION_TYPES.SHOPPING_LIST.REMOVE, payload: newFoodList})
}