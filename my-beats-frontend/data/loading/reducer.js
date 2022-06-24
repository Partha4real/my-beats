import * as actionTypes from "./actionType";

let initialState = {
    loading: false,
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case actionTypes.LOADING_TRUE:
            return { loading: true };
        case actionTypes.LOADING_FALSE:
            return { loading: false };
        default:
            return state;
    }
}
