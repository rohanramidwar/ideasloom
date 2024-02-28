import React from "react";
import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  const navigate = useNavigate();

  const openPost = () => {
    navigate(`posts/${post?._id}`);
  };

  return (
    <div onClick={openPost}>
      <h2>{post?.title}</h2>
      <p>{post?.content}</p>
      <p>{post?.creator}</p>
    </div>
  );
};

export default Post;
