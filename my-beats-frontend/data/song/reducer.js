import * as actionTypes from "./actionType";

export default function user(state = [], action) {
    switch (action.type) {
        case actionTypes.FETCH_SONG:
            return [...action.payload.data];
        case actionTypes.CREATE_SONG:
            return [...state, action.payload.data];
        case actionTypes.UPDATE_SONG:
            return state.map((item) => (item._id === action.payload.data._id ? action.payload.data : item));
        case actionTypes.DELETE_SONG:
            return state.filter((item) => item._id !== action.id);
        case actionTypes.DELETE_MULTIPLE_SONG:
            return state.filter((item) => !action.ids.includes(item._id));
        default:
            return state;
    }
}
