import {combineReducers} from "redux";
import authReducer from './authReducer'
import cartReducers from "./cartReducers";
import storeReducer from "./storeReducer";

export default combineReducers({
    auth: authReducer,
    cart: cartReducers,
    store: storeReducer
})