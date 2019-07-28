import {
    FETCH_SNACKS,
} from "../actions/types";


export default (snacks = [], action) => {
    switch (action.type) {
        case FETCH_SNACKS:
            return [...action.payload];
        default:
            return snacks;
    }
};
