import liquorStoreApi from "../apis/liquorStoreApi";
import {ADD_COCKTAIL_TO_CART, ADD_ITEM_TO_CART, FETCH_COCKTAILS} from "./types";


export const fetchCocktails = () => async dispatch => {
    const response = await liquorStoreApi.get('/cocktails');
    dispatch({
        type: FETCH_COCKTAILS,
        payload: response.data
    })
};



export const addCocktailToCart = cocktail => async (dispatch, getState) => {
    const response = await liquorStoreApi.put(`/addCocktailToCart`,{cocktailId: cocktail.itemId});

    cocktail.items.forEach(item => {
        dispatch({
            type: ADD_ITEM_TO_CART,
            payload: {...item, quantity:1}
        })
    });
};