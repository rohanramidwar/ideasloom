import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { createPost } from "../actions/postActions";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(postData, navigate));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          name="title"
          type="text"
          value={postData.title}
          placeholder="Title"
          onChange={handleChange}
        />
        <label>Content</label>
        <input
          name="content"
          type="text"
          value={postData.content}
          placeholder="Content"
          onChange={handleChange}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
