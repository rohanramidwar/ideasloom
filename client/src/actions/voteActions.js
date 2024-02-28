import { UPDATEPOST } from "../constants/actionTypes";
import * as api from "../api";

export const upVote = (id) => async (dispatch) => {
  try {
    const { data } = await api.upVote(id); //updated post
    dispatch({ type: UPDATEPOST, payload: data }); //sends to reducer
  } catch (err) {
    console.log(err);
  }
};

export const removeUpVote = (id) => async (dispatch) => {
  try {
    const { data } = await api.removeUpVote(id); //updated post
    dispatch({ type: UPDATEPOST, payload: data }); //sends to reducer
  } catch (err) {
    console.log(err);
  }
};

export const downVote = (id) => async (dispatch) => {
  try {
    const { data } = await api.downVote(id); //updated post
    dispatch({ type: UPDATEPOST, payload: data }); //sends to reducer
  } catch (err) {
    console.log(err);
  }
};

export const removeDownVote = (id) => async (dispatch) => {
  try {
    const { data } = await api.removeDownVote(id); //updated post
    dispatch({ type: UPDATEPOST, payload: data }); //sends to reducer
  } catch (err) {
    console.log(err);
  }
};
