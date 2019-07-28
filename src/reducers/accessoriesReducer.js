import {
    FETCH_ACCESSORIES,
} from "../actions/types";


export default (accessories = [], action) => {
    switch (action.type) {
        case FETCH_ACCESSORIES:
            return [...action.payload];
        default:
            return accessories;
    }
};
