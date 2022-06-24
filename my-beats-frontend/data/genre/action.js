import axios from "axios";
import * as api from "../../api/api";
import * as actionTypes from "./actionType";
import * as loading from "../loading/actionType";

export const getAllGenre = () => async (dispatch) => {
    dispatch({
        type: loading.LOADING_TRUE,
    });

    const { data } = await api.getGenre();

    dispatch({
        type: loading.LOADING_FALSE,
    });

    dispatch({
        type: actionTypes.FETCH_GENRE,
        payload: data,
    });
};

export const createGenre = (info) => async (dispatch) => {
    dispatch({
        type: loading.LOADING_TRUE,
    });

    const { data } = await api.addGenre(info);

    dispatch({
        type: loading.LOADING_FALSE,
    });

    dispatch({
        type: actionTypes.CREATE_GENRE,
        payload: data,
    });
};

export const updateGenre = (id, info) => async (dispatch) => {
    dispatch({
        type: loading.LOADING_TRUE,
    });

    const { data } = await api.updateGenre(id, info);

    dispatch({
        type: loading.LOADING_FALSE,
    });

    dispatch({
        type: actionTypes.UPDATE_GENRE,
        payload: data,
    });
};

export const deleteGenre = (id) => async (dispatch) => {
    dispatch({
        type: loading.LOADING_TRUE,
    });

    const { data } = await api.deleteGenre(id);

    dispatch({
        type: loading.LOADING_FALSE,
    });

    dispatch({
        type: actionTypes.DELETE_GENRE,
        id,
    });
};

export const deleteMultipleGenre = (ids) => async (dispatch) => {
    dispatch({
        type: loading.LOADING_TRUE,
    });

    const { data } = await api.deleteMultipleGenre(ids);

    dispatch({
        type: loading.LOADING_FALSE,
    });

    dispatch({
        type: actionTypes.DELETE_MULTIPLE_GENRE,
        ids,
    });
};
