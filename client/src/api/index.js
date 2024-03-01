import axios from "axios"; //used to make api calls

const API = axios.create({ baseURL: "http://localhost:5000" }); //points to backend routes

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchAllPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`); //post id
export const createPost = (newPost) => API.post("/posts", newPost); //sends data

export const upVote = (id) => API.post(`/posts/${id}/upvote`); //post id
export const removeUpVote = (id) => API.delete(`/posts/${id}/removeupvote`); //post id
export const downVote = (id) => API.post(`/posts/${id}/downvote`); //post id
export const removeDownVote = (id) => API.delete(`/posts/${id}/removedownvote`); //post id

export const addComment = (commentData) =>
  API.post(`/posts/${commentData.id}/comment`, commentData);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
