import {
  FETCHALLPOSTS,
  CREATEPOST,
  FETCHPOST,
  STARTLOADING,
  ENDLOADING,
} from "../constants/actionTypes";
import * as api from "../api";

//has action type and payload
export const getAllPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: STARTLOADING });
    const {
      data: { data, noOfPages },
    } = await api.fetchAllPosts(page);
    dispatch({ type: FETCHALLPOSTS, payload: { data, noOfPages } }); //sends to reducer
    dispatch({ type: ENDLOADING });
  } catch (err) {
    console.log(err);
  }
};

export const createPost = (newPost, navigate) => async (dispatch) => {
  try {
    dispatch({ type: STARTLOADING });
    const { data } = await api.createPost(newPost);
    dispatch({ type: CREATEPOST, payload: data });
    navigate("/");
    dispatch({ type: ENDLOADING });
  } catch (err) {
    console.log(err);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: STARTLOADING });
    const { data } = await api.fetchPost(id); //single post
    dispatch({ type: FETCHPOST, payload: data }); //sends to reducer
    dispatch({ type: ENDLOADING });
  } catch (err) {
    console.log(err);
  }
};
