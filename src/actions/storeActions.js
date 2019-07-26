import {
    ADD_ITEM_TO_STORE,
    FETCH_STORE,
    REMOVE_ITEM_FROM_STORE,
    UPDATE_STORE_ITEM
} from "./types";

import liquorStoreApi from '../apis/liquorStoreApi'



export const addItemToStore = item => async (dispatch, getState) => {
    const response = await liquorStoreApi.put(`/addItemToStore`,{item});

    dispatch({
        type: ADD_ITEM_TO_STORE,
        payload: item
    })
};

export const updateStoreItem = item => async (dispatch, getState) => {
    const response = await liquorStoreApi.update(`/updateStoreItem`,{item});

    dispatch({
        type: UPDATE_STORE_ITEM,
        payload: item
    })
};



export const removeItemFromStore = itemId => async (dispatch, getState) => {
    const response = await liquorStoreApi.delete(`/removeItemFromStore/${itemId}`);

    dispatch({
        type: REMOVE_ITEM_FROM_STORE,
        payload: itemId
    })
};

export const fetchStore = () => async dispatch => {
    const response = await liquorStoreApi.get('/store');
    dispatch({
        type: FETCH_STORE,
        payload: response.data
    })
};

