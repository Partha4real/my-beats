import * as api from "../../api/api";
import * as actionTypes from "./actionType";
import * as loading from "../loading/actionType";

export const getAllSong = () => async (dispatch) => {
    dispatch({
        type: loading.LOADING_TRUE,
    });
    const { data } = await api.getSong();

    dispatch({
        type: actionTypes.FETCH_SONG,
        payload: data,
    });

    dispatch({
        type: loading.LOADING_FALSE,
    });
};

export const createSong = (info) => async (dispatch) => {
    dispatch({
        type: loading.LOADING_TRUE,
    });

    const { data } = await api.addSong(info);

    dispatch({
        type: loading.LOADING_FALSE,
    });

    dispatch({
        type: actionTypes.CREATE_SONG,
        payload: data,
    });
};

export const updateSong = (id, info) => async (dispatch) => {
    dispatch({
        type: loading.LOADING_TRUE,
    });

    const { data } = await api.updateSong(id, info);

    dispatch({
        type: loading.LOADING_FALSE,
    });

    dispatch({
        type: actionTypes.UPDATE_SONG,
        payload: data,
    });
};

export const deleteSong = (id) => async (dispatch) => {
    dispatch({
        type: loading.LOADING_TRUE,
    });

    const { data } = await api.deleteSong(id);

    dispatch({
        type: loading.LOADING_FALSE,
    });

    dispatch({
        type: actionTypes.DELETE_SONG,
        id,
    });
};

export const deleteMultipleSong = (ids) => async (dispatch) => {
    dispatch({
        type: loading.LOADING_TRUE,
    });

    const { data } = await api.deleteMultipleSong(ids);

    dispatch({
        type: loading.LOADING_FALSE,
    });

    dispatch({
        type: actionTypes.DELETE_MULTIPLE_SONG,
        ids,
    });
};
