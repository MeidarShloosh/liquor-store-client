import {
    ADD_ITEM_TO_STORE,
    FETCH_STORE,
    REMOVE_ITEM_FROM_STORE,
    UPDATE_STORE_ITEM
} from "../actions/types";
import _ from 'lodash'


export default (store = [], action) => {
    switch (action.type) {
        case ADD_ITEM_TO_STORE:
            return [...store, action.payload];
        case UPDATE_STORE_ITEM:
            const newStore =_.remove(store, item=> item.itemId === action.payload.itemId);
            return [...newStore, action.payload];
        case FETCH_STORE:
            return [...action.payload];
        case REMOVE_ITEM_FROM_STORE:
            return _.remove(store, item=> item.itemId === action.payload);
        default:
            return store;
    }
};
