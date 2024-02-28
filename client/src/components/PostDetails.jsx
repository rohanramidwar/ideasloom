import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { getPost } from "../actions/postActions";

const PostDetails = () => {
  const { id } = useParams(); //post id

  const { post } = useSelector((state) => state?.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  return (
    <div>
      <h2>{post?.title}</h2>
      <p>{post?.content}</p>
      <p>{post?.creator}</p>
    </div>
  );
};

export default PostDetails;
