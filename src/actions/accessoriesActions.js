import {
    FETCH_ACCESSORIES
} from "./types";

import liquorStoreApi from '../apis/liquorStoreApi'



export const fetchAccessories = () => async dispatch => {
    const response = await liquorStoreApi.get('/accessories');
    dispatch({
        type: FETCH_ACCESSORIES,
        payload: response.data
    })
};

