import * as actionTypes from "./actionType";

export default function user(state = [], action) {
    switch (action.type) {
        case actionTypes.FETCH_TAG:
            return [...action.payload.data];
        case actionTypes.CREATE_TAG:
            return [...state, action.payload.data];
        case actionTypes.UPDATE_TAG:
            return state.map((item) => (item._id === action.payload.data._id ? action.payload.data : item));
        case actionTypes.DELETE_TAG:
            return state.filter((item) => item._id !== action.id);
        case actionTypes.DELETE_MULTIPLE_TAG:
            return state.filter((item) => !action.ids.includes(item._id));
        default:
            return state;
    }
}
