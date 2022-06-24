import * as api from "../../api/api";
import * as actionTypes from "./actionType";
import * as loading from "../loading/actionType";

export const getAllTag = () => async (dispatch) => {
    dispatch({
        type: loading.LOADING_TRUE,
    });

    const { data } = await api.getTag();

    dispatch({
        type: loading.LOADING_FALSE,
    });

    dispatch({
        type: actionTypes.FETCH_TAG,
        payload: data,
    });
};

export const createTag = (info) => async (dispatch) => {
    dispatch({
        type: loading.LOADING_TRUE,
    });

    const { data } = await api.addTag(info);

    dispatch({
        type: loading.LOADING_FALSE,
    });

    dispatch({
        type: actionTypes.CREATE_TAG,
        payload: data,
    });
};

export const updateTag = (id, info) => async (dispatch) => {
    dispatch({
        type: loading.LOADING_TRUE,
    });

    const { data } = await api.updateTag(id, info);

    dispatch({
        type: loading.LOADING_FALSE,
    });

    dispatch({
        type: actionTypes.UPDATE_TAG,
        payload: data,
    });
};

export const deleteTag = (id) => async (dispatch) => {
    dispatch({
        type: loading.LOADING_TRUE,
    });

    const { data } = await api.deleteTag(id);

    dispatch({
        type: loading.LOADING_FALSE,
    });

    dispatch({
        type: actionTypes.DELETE_TAG,
        id,
    });
};

export const deleteMultipleTag = (ids) => async (dispatch) => {
    dispatch({
        type: loading.LOADING_TRUE,
    });

    const { data } = await api.deleteMultipleTag(ids);

    dispatch({
        type: loading.LOADING_FALSE,
    });

    dispatch({
        type: actionTypes.DELETE_MULTIPLE_TAG,
        ids,
    });
};
