import { combineReducers } from "redux";
import artistReducer from "./artist/reducer";
import genreReducer from "./genre/reducer";
import tagReducer from "./tag/reducer";
import loadingReducer from "./loading/reducer";
import alertMessageReducer from "./alertMessage/reducer";

export default combineReducers({
    loader: loadingReducer,
    artist: artistReducer,
    genre: genreReducer,
    tag: tagReducer,
    alertMessage: alertMessageReducer,
});
