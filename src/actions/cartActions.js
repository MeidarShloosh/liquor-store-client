import {
    ADD_ITEM_TO_CART, CHECKOUT,
    FETCH_CART,
    REMOVE_ITEM_FROM_CART,
    UPDATE_ITEM_QUANTITY
} from "./types";

import liquorStoreApi from '../apis/liquorStoreApi'



export const addItemToCart = item => async (dispatch, getState) => {
    const response = await liquorStoreApi.post(`/addItemToCart/`,{itemId: item.itemId, quantity: item.quantity});

    dispatch({
        type: ADD_ITEM_TO_CART,
        payload: item
    })
};

export const updateCartItemQuantity = (itemId, quantity) => async (dispatch, getState) => {
    const response = await liquorStoreApi.put(`/updateCartItemQuantity/`,{itemId, quantity});

    dispatch({
        type: UPDATE_ITEM_QUANTITY,
        payload: {itemId,quantity}
    })
};



export const removeItemFromCart = itemId => async (dispatch, getState) => {
    const response = await liquorStoreApi.delete(`/removeItemFromCart/${itemId}`);

    dispatch({
        type: REMOVE_ITEM_FROM_CART,
        payload: item
    })
};

export const fetchCart = () => async dispatch => {
    const response = await liquorStoreApi.get('/cart');
    dispatch({
        type: FETCH_CART,
        payload: response.data
    })
};


export const checkout = () => async dispatch => {
    const response = await liquorStoreApi.post('/checkout');
    dispatch({
        type: CHECKOUT
    })
};