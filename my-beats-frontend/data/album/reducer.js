import * as actionTypes from "./actionType";

export default function user(state = [], action) {
    switch (action.type) {
        case actionTypes.FETCH_ALBUM:
            return [...action.payload.data];
        case actionTypes.CREATE_ALBUM:
            return [...state, action.payload.data];
        case actionTypes.UPDATE_ALBUM:
            return state.map((item) => (item._id === action.payload.data._id ? action.payload.data : item));
        case actionTypes.DELETE_ALBUM:
            return state.filter((item) => item._id !== action.id);
        case actionTypes.DELETE_MULTIPLE_ALBUM:
            return state.filter((item) => !action.ids.includes(item._id));
        default:
            return state;
    }
}
