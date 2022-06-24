import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/v1" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("user")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("user")).token}`;
    }

    return req;
});

// Artist
export const getArtist = () => API.get("/artist/getArtist");
export const addArtist = (data) => API.post("/artist/addArtist", data);
export const updateArtist = (id, data) => API.post(`/artist/updateArtist/${id}`, data);
export const deleteArtist = (id) => API.delete(`/artist/deleteArtist/${id}`);
export const deleteMultipleArtist = (data) => API.delete(`/artist/deleteMultipleArtist`, { data: data });

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
