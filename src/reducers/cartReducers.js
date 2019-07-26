import {
    ADD_ITEM_TO_CART, CHECKOUT,
    FETCH_CART,
    REMOVE_ITEM_FROM_CART,
    UPDATE_ITEM_QUANTITY
} from "../actions/types";
import _ from 'lodash'


export default (cart = [], action) => {
    switch (action.type) {
        case ADD_ITEM_TO_CART:
            for (let i = 0; i < cart.length; i++) {
                if(cart[i].itemId === action.payload.itemId){
                    let newCart = [...cart];
                    newCart[i].quantity += action.payload.quantity;
                    return newCart;
                }
            }
            return [...cart, action.payload];
        case UPDATE_ITEM_QUANTITY:
            for (let i = 0; i < cart.length; i++) {
                if(cart[i].itemId === action.payload.itemId){
                    let newCart = [...cart];
                    newCart[i].quantity += action.payload.quantity;
                    return newCart;
                }
            }
            return cart;
        case FETCH_CART:
            return [...action.payload];
        case REMOVE_ITEM_FROM_CART:
            return _.remove(cart, item=> item.itemId === action.payload);
        case CHECKOUT:
            return [];
        default:
            return cart;
    }
};
