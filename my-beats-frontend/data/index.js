import { combineReducers } from "redux";
import artistReducer from "./artist/reducer";
import albumReducer from "./album/reducer";
import songReducer from "./song/reducer";
import genreReducer from "./genre/reducer";
import tagReducer from "./tag/reducer";
import loadingReducer from "./loading/reducer";
import alertMessageReducer from "./alertMessage/reducer";

export default combineReducers({
    loader: loadingReducer,
    artist: artistReducer,
    album: albumReducer,
    song: songReducer,
    genre: genreReducer,
    tag: tagReducer,
    alertMessage: alertMessageReducer,
});
