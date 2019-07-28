import {combineReducers} from "redux";
import authReducer from './authReducer'
import cartReducers from "./cartReducers";
import storeReducer from "./storeReducer";
import cocktailReducer from "./cocktailReducer";
import accessoriesReducer from "./accessoriesReducer";
import snacksReducer from "./snacksReducer";

export default combineReducers({
    auth: authReducer,
    cart: cartReducers,
    store: storeReducer,
    cocktails: cocktailReducer,
    accessories: accessoriesReducer,
    snacks: snacksReducer
})