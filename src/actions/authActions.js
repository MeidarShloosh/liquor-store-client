import {SIGN_IN, SIGN_OUT} from "./types";
import liquorStoreApi from "../apis/liquorStoreApi";
import history from "../history";

export const signIn = (redirectLink) => async (dispatch, getState) => {
    try {
        const response = await liquorStoreApi.get(`/user`, {withCredentials: true});

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

export const signOut = (session, onErr) => async (dispatch, getState) => {
    try {
        const response = await liquorStoreApi.post(`/logout`);
    }
    catch (e) {

    }
    dispatch({
        type: SIGN_OUT
    });
};