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

export const fetchAllPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost); //sends data

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
