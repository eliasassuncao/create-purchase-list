import {ACTION_TYPES} from "../constants";

export const largeSideMenu = () => ({
    type: ACTION_TYPES.SIDE_MENU.SM_DOWN_MENU
});

export const toggleSideMenu = () => ({
    type: ACTION_TYPES.SIDE_MENU.MD_UP_MENU
});

export const dispatchLoadingAndCallService = (service, params) => (dispatch) =>
    new Promise((resolve, reject) => {
        dispatch({type: ACTION_TYPES.LOADING, payload: true});
        service(params)
            .then((res) => {
                dispatch({type: ACTION_TYPES.LOADING, payload: false});
                resolve(res)
            })
            .catch((err) => {
                dispatch({type: ACTION_TYPES.LOADING, payload: false});
                reject(err)
            })
    });