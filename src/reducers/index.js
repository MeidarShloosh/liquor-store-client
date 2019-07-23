import {combineReducers} from "redux";
import authReducer from './authReducer'
import cartReducers from "./cartReducers";

export default combineReducers({
    auth: authReducer,
    cart: cartReducers
})