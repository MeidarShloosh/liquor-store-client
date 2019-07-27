import {SIGN_IN, SIGN_OUT} from "./types";
import liquorStoreApi from "../apis/liquorStoreApi";

export const signIn = () => async (dispatch, getState) => {
    try {
        const response = await liquorStoreApi.get(`/user`);

        dispatch({
            type: SIGN_IN,
            payload: response.data
        });

    }catch (e) {
        dispatch({
            type: SIGN_OUT
        });

    }
};

export const signOut = () => async (dispatch, getState) => {
    try {
        await liquorStoreApi.post(`/logout`);
    }
    catch (e) {

    }
    dispatch({
        type: SIGN_OUT
    });
};