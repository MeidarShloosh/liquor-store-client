import {
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM
} from "./types";

import api from '../apis/liquorStoreApi'
import history from '../history'


export const createStream = formValues => async (dispatch, getState) => {
    const {userId} = getState().auth;
    const response = await api.post('/streams', {...formValues, userId});

    dispatch({
        type: CREATE_STREAM,
        payload: response.data
    })

    history.push('/')
};

export const fetchStreams = () => async dispatch => {
    const response = await api.get('/streams');
    dispatch({
        type: FETCH_STREAMS,
        payload: response.data
    })
};

export const fetchStream = streamId => async dispatch => {
    const response = await api.get(`/streams/${streamId}`);

    dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (streamId, formValues) => async (dispatch, getState) => {
    const response = await api.patch(`/streams/${streamId}`, formValues);

    dispatch({
        type: EDIT_STREAM,
        payload: response.data
    });

    history.push('/')
};

export const deleteStream = (streamId) => async dispatch => {
    await api.delete(`/streams/${streamId}`);
    dispatch({
        type: DELETE_STREAM,
        payload: streamId
    })
};