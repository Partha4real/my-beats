import * as actionTypes from "./actionType";

export default function user(state = [], action) {
    switch (action.type) {
        case actionTypes.FETCH_ARTIST:
            return [...action.payload.data];
        case actionTypes.CREATE_ARTIST:
            return [...state, action.payload.data];
        case actionTypes.UPDATE_ARTIST:
            return state.map((item) => (item._id === action.payload.data._id ? action.payload.data : item));
        case actionTypes.DELETE_ARTIST:
            return state.filter((item) => item._id !== action.id);
        case actionTypes.DELETE_MULTIPLE_ARTIST:
            return state.filter((item) => !action.ids.includes(item._id));
        default:
            return state;
    }
}
