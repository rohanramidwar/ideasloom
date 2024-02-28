import { FETCHALLPOSTS, CREATEPOST, FETCHPOST } from "../constants/actionTypes";
import * as api from "../api";

//has action type and payload
export const getAllPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAllPosts();
    dispatch({ type: FETCHALLPOSTS, payload: data }); //sends to reducer
  } catch (err) {
    console.log(err);
  }
};

export const createPost = (newPost, navigate) => async (dispatch) => {
  try {
    const { data } = await api.createPost(newPost);
    dispatch({ type: CREATEPOST, payload: data });
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchPost(id); //single post
    dispatch({ type: FETCHPOST, payload: data }); //sends to reducer
  } catch (err) {
    console.log(err);
  }
};
