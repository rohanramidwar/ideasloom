import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import { getPost } from "../actions/postActions";
import { addComment } from "../actions/commentActions";

const PostDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  //result and token
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const { id } = useParams(); //post id

  const { post } = useSelector((state) => state?.posts);

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  const [commentData, setCommentData] = useState({
    text: "",
    user: user?.result?.name, //user name
    id, //post id
  });

  const handleChange = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  };

  const submitComment = (e) => {
    e.preventDefault();
    dispatch(addComment(commentData));
  };

  return (
    <div>
      <h2>{post?.title}</h2>
      <p>{post?.content}</p>
      <p>{post?.creator}</p>
      <form onSubmit={submitComment}>
        <input
          onChange={handleChange}
          name="text"
          type="text"
          placeholder="Say something"
        />
        <button type="submit">Comment</button>
      </form>
    </div>
  );
};

export default PostDetails;
