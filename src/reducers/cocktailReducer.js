import {
    FETCH_COCKTAILS,
} from "../actions/types";


export default (cocktails = [], action) => {
    switch (action.type) {
        case FETCH_COCKTAILS:
            return [...action.payload];
        default:
            return cocktails;
    }
};
