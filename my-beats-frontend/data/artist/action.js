import * as api from "../../api/api";
import * as actionTypes from "./actionType";
import * as loading from "../loading/actionType";

export const getAllArtist = () => async (dispatch) => {
    dispatch({
        type: loading.LOADING_TRUE,
    });

    const { data } = await api.getArtist();

    dispatch({
        type: loading.LOADING_FALSE,
    });

    dispatch({
        type: actionTypes.FETCH_ARTIST,
        payload: data,
    });
};

export const createArtist = (info) => async (dispatch) => {
    dispatch({
        type: loading.LOADING_TRUE,
    });

    const { data } = await api.addArtist(info);

    dispatch({
        type: loading.LOADING_FALSE,
    });

    dispatch({
        type: actionTypes.CREATE_ARTIST,
        payload: data,
    });
};

export const updateArtist = (id, info) => async (dispatch) => {
    dispatch({
        type: loading.LOADING_TRUE,
    });

    const { data } = await api.updateArtist(id, info);

    dispatch({
        type: loading.LOADING_FALSE,
    });

    dispatch({
        type: actionTypes.UPDATE_ARTIST,
        payload: data,
    });
};

export const deleteArtist = (id) => async (dispatch) => {
    dispatch({
        type: loading.LOADING_TRUE,
    });

    const { data } = await api.deleteArtist(id);

    dispatch({
        type: loading.LOADING_FALSE,
    });

    dispatch({
        type: actionTypes.DELETE_ARTIST,
        id,
    });
};

export const deleteMultipleArtist = (ids) => async (dispatch) => {
    dispatch({
        type: loading.LOADING_TRUE,
    });

    const { data } = await api.deleteMultipleArtist(ids);

    dispatch({
        type: loading.LOADING_FALSE,
    });

    dispatch({
        type: actionTypes.DELETE_MULTIPLE_ARTIST,
        ids,
    });
};
