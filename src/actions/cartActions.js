import {
    ADD_ITEM_TO_CART, CHECKOUT,
    FETCH_CART,
    REMOVE_ITEM_FROM_CART,
    UPDATE_ITEM_QUANTITY
} from "./types";

import liquorStoreApi from '../apis/liquorStoreApi'



export const addItemToCart = (item,quantity) => async (dispatch, getState) => {
    await liquorStoreApi.put(`/addItemToCart`,{itemId: item.itemId, quantity: quantity});

    dispatch({
        type: ADD_ITEM_TO_CART,
        payload: {...item, quantity}
    })
};

export const updateCartItemQuantity = (itemId, quantity) => async (dispatch, getState) => {
    await liquorStoreApi.post(`/updateCartItemQuantity`,{itemId, quantity});

    dispatch({
        type: UPDATE_ITEM_QUANTITY,
        payload: {itemId,quantity}
    })
};



export const removeItemFromCart = itemId => async (dispatch, getState) => {
    await liquorStoreApi.delete(`/removeItemFromCart/${itemId}`);

    dispatch({
        type: REMOVE_ITEM_FROM_CART,
        payload: itemId
    })
};

export const fetchCart = () => async dispatch => {
    const response = await liquorStoreApi.get('/cart');
    console.log(response)
    dispatch({
        type: FETCH_CART,
        payload: response.data
    })
};


export const checkout = () => async dispatch => {
    await liquorStoreApi.post('/checkout');
    dispatch({
        type: CHECKOUT
    })
};