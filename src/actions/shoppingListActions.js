import {ACTION_TYPES} from "../constants";
import _ from 'lodash';

export const addFoodListToShoppingList = (newFood) => (dispatch, getState) => {
    const {shoppingList: {foodList}} = getState();
    let newArr = [];
    _.map(foodList, food => newArr.push(food));
    _.map(newFood, food => newArr.push(food));
    //Deixar produtos que já contia na lista, e adicionar os novos.
    dispatch({type: ACTION_TYPES.SHOPPING_LIST.ADD, payload: newArr});
}

export const changeStatusFood = (status, index) => (dispatch) => {
    //Mudar status "pendente" para "no carrinho" ou vice-versa do produto com base no indice.
    dispatch({type: ACTION_TYPES.SHOPPING_LIST.CHANGE_STATUS, payload: {status: status, index: index}})
}

export const resetShoppingList = () => (dispatch) => {
    //Limpar lista de compras.
    dispatch({type: ACTION_TYPES.SHOPPING_LIST.CLEAN, payload: {}})
}

export const removeFood = (id) => (dispatch, getState) => {
    const {shoppingList: {foodList}} = getState();
    //Remover produto da lista com base no Id.
    let newFoodList = _.remove(_.map(foodList), food => food.id !== id)
    dispatch({type: ACTION_TYPES.SHOPPING_LIST.REMOVE, payload: newFoodList})
}