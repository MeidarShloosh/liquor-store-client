import {SIGN_IN, SIGN_OUT} from "../actions/types";

const INITIAL_STATE = {
    isSignedIn: null,
    userId: null,
    profileDetails:null
};

export default (state = INITIAL_STATE, action) =>{
    switch (action.type) {
        case SIGN_IN:
            return {...state,
                isSignedIn: true,
                userId: action.payload.getId(),
                profileDetails: action.payload.getBasicProfile()};
        case SIGN_OUT:
            return {...state, isSignedIn: false, userId: null, profileDetails: null};
        default:
            return state
    }
};