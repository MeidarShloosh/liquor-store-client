import {
    ADD_ITEM_TO_STORE,
    FETCH_STORE,
    REMOVE_ITEM_FROM_STORE,
    UPDATE_STORE_ITEM
} from "./types";

import liquorStoreApi from '../apis/liquorStoreApi'



export const fetchStore = () => async dispatch => {
    const response = await liquorStoreApi.get('/store');
    dispatch({
        type: FETCH_STORE,
        payload: response.data
    })
};

