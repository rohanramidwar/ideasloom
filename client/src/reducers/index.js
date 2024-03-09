import { combineReducers } from "redux";
import posts from "./postReducers";
import auth from "./authReducers";

export default combineReducers({ posts, auth });
