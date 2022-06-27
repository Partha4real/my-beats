import axios from "axios";
import store from "../store/store";

const API = axios.create({ baseURL: "http://localhost:8000/api/v1" });

const interceptor = (store) => {
    const dispatch = store.dispatch;
    API.interceptors.request.use(
        (req) => {
            if (localStorage.getItem("user")) {
                req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("user")).token}`;
            }

            return req;
        },
        (error) => {
            return error;
        },
    );

    API.interceptors.response.use(
        (res) => {
            if (res.status === 200 || res.statusText === "ok") {
                dispatch({
                    type: "SET_ALERT",
                    payload: {
                        isOpen: true,
                        message: res.data.message,
                        alertType: "success",
                    },
                });
            }
            return res;
        },
        (error) => {
            if (error.response.data.message || error.message) {
                dispatch({
                    type: "SET_ALERT",
                    payload: {
                        isOpen: true,
                        message: error.response.data.message ? error.response.data.message : error.message,
                        alertType: "error",
                    },
                });
            }
            return error.response;
        },
    );
};

interceptor(store);

// Artist
export const getArtist = () => API.get("/artist/getArtist");
export const addArtist = (data) => API.post("/artist/addArtist", data);
export const updateArtist = (id, data) => API.post(`/artist/updateArtist/${id}`, data);
export const deleteArtist = (id) => API.delete(`/artist/deleteArtist/${id}`);
export const deleteMultipleArtist = (data) => API.delete(`/artist/deleteMultipleArtist`, { data: data });

// Albulm
export const getAlbum = () => API.get("/album/getAlbum");
export const addAlbum = (data) => API.post("/album/addAlbum", data);
export const updateAlbum = (id, data) => API.post(`/album/updateAlbum/${id}`, data);
export const deleteAlbum = (id) => API.delete(`/album/deleteAlbum/${id}`);
export const deleteMultipleAlbum = (data) => API.delete(`/album/deleteMultipleAlbum`, { data: data });

// Song
export const getSong = () => API.get("/song/getSong");
export const addSong = (data) => API.post("/song/addSong", data);
export const updateSong = (id, data) => API.post(`/song/updateSong/${id}`, data);
export const deleteSong = (id) => API.delete(`/song/deleteSong/${id}`);
export const deleteMultipleSong = (data) => API.delete(`/song/deleteMultipleSong`, { data: data });

// Genre
export const getGenre = () => API.get("/genre/getGenre");
export const addGenre = (data) => API.post("/genre/addGenre", data);
export const updateGenre = (id, data) => API.post(`/genre/updateGenre/${id}`, data);
export const deleteGenre = (id) => API.delete(`/genre/deleteGenre/${id}`);
export const deleteMultipleGenre = (data) => API.delete(`/genre/deleteMultipleGenre`, { data: data });

// Tag
export const getTag = () => API.get("/tag/getTag");
export const addTag = (data) => API.post("/tag/addTag", data);
export const updateTag = (id, data) => API.post(`/tag/updateTag/${id}`, data);
export const deleteTag = (id) => API.delete(`/tag/deleteTag/${id}`);
export const deleteMultipleTag = (data) => API.delete(`/tag/deleteMultipleTag`, { data: data });
