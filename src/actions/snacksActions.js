import {
    FETCH_SNACKS
} from "./types";

import liquorStoreApi from '../apis/liquorStoreApi'



export const fetchSnacks = () => async dispatch => {
    const response = await liquorStoreApi.get('/snacks');
    dispatch({
        type: FETCH_SNACKS,
        payload: response.data.Snacks
    })
};

