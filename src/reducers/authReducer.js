import {SIGN_IN, SIGN_OUT} from "../actions/types";

const INITIAL_STATE = {
    isSignedIn: null,
    profileDetails:null
};

export default (state = INITIAL_STATE, action) =>{
    switch (action.type) {
        case SIGN_IN:
            return {...state,
                isSignedIn: true,
                profileDetails: action.payload};
        case SIGN_OUT:
            return {...state, isSignedIn: false,  profileDetails: null};
        default:
            return state
    }
};