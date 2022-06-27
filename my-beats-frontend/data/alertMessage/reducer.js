import * as actionTypes from "./actionType";

const initialState = {
    isOpen: false,
    message: "",
    alertType: "success",
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_ALERT:
            return {
                ...action.payload,
            };
        case actionTypes.UNSET_ALERT:
            return {
                ...initialState,
            };
        default:
            return state;
    }
}
