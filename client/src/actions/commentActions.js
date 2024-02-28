import { UPDATEPOST } from "../constants/actionTypes";
import * as api from "../api";

export const addComment = (commentData) => async (dispatch) => {
  try {
    const { data } = await api.addComment(commentData);
    dispatch({ type: UPDATEPOST, payload: data });
  } catch (err) {
    console.log(err);
  }
};
