import toast from "react-hot-toast";

import * as api from "../api/index.js";
import { AUTH } from "../constants/actionTypes";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    toast.success("Login successfull!");
    navigate("/");
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    toast.success("Sign up successfull!");
    navigate("/");
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
  }
};
