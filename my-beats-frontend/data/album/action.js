import * as api from "../../api/api";
import * as actionTypes from "./actionType";
import * as loading from "../loading/actionType";

export const getAllAlbum = () => async (dispatch) => {
    dispatch({
        type: loading.LOADING_TRUE,
    });
    const { data = [] } = await api.getAlbum();

    dispatch({
        type: actionTypes.FETCH_ALBUM,
        payload: data,
    });
    dispatch({
        type: loading.LOADING_FALSE,
    });
};

export const createAlbum = (info) => async (dispatch) => {
    dispatch({
        type: loading.LOADING_TRUE,
    });

    const { data } = await api.addAlbum(info);

    dispatch({
        type: loading.LOADING_FALSE,
    });

    dispatch({
        type: actionTypes.CREATE_ALBUM,
        payload: data,
    });
};

export const updateAlbum = (id, info) => async (dispatch) => {
    dispatch({
        type: loading.LOADING_TRUE,
    });

    const { data } = await api.updateAlbum(id, info);

    dispatch({
        type: loading.LOADING_FALSE,
    });

    dispatch({
        type: actionTypes.UPDATE_ALBUM,
        payload: data,
    });
};

export const deleteAlbum = (id) => async (dispatch) => {
    dispatch({
        type: loading.LOADING_TRUE,
    });

    const { data } = await api.deleteAlbum(id);

    dispatch({
        type: loading.LOADING_FALSE,
    });

    dispatch({
        type: actionTypes.DELETE_ALBUM,
        id,
    });
};

export const deleteMultipleAlbum = (ids) => async (dispatch) => {
    dispatch({
        type: loading.LOADING_TRUE,
    });

    const { data } = await api.deleteMultipleAlbum(ids);

    dispatch({
        type: loading.LOADING_FALSE,
    });

    dispatch({
        type: actionTypes.DELETE_MULTIPLE_ALBUM,
        ids,
    });
};
