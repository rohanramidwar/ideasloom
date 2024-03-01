import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  downVote,
  removeDownVote,
  removeUpVote,
  upVote,
} from "../actions/voteActions";

const Post = ({ post }) => {
  //result and token
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const { upVotes, downVotes } = post;

  const [isUpVoted, setIsUpVoted] = useState(false);
  const [isDownVoted, setIsDownVoted] = useState(false);

  useEffect(() => {
    setIsUpVoted(upVotes.some((upvote) => upvote.user === user?.result?._id));
    setIsDownVoted(
      downVotes.some((downvote) => downvote.user === user?.result?._id)
    );
  }, [downVotes, upVotes]);

  const openPost = () => {
    navigate(`posts/${post?._id}`);
  };

  const handleUpVote = () => {
    dispatch(upVote(post?._id));
    dispatch(removeDownVote(post?._id));
  };
  const handleRemoveUpVote = () => {
    dispatch(removeUpVote(post?._id));
  };
  const handleDownVote = () => {
    dispatch(downVote(post?._id));
    dispatch(removeUpVote(post?._id));
  };
  const handleRemoveDownVote = () => {
    dispatch(removeDownVote(post?._id));
  };

  return (
    <div>
      <div onClick={openPost}>
        <h2>{post?.title}</h2>
        <p>{post?.content}</p>
      </div>
      <span>{upVotes?.length - downVotes?.length}</span>
      {isUpVoted ? (
        <button onClick={handleRemoveUpVote}>remove upvote</button>
      ) : (
        <button onClick={handleUpVote}>upvote</button>
      )}

      {isDownVoted ? (
        <button onClick={handleRemoveDownVote}>remove downvote</button>
      ) : (
        <button onClick={handleDownVote}>downvote</button>
      )}
      <p>{post?.creator}</p>
    </div>
  );
};

export default Post;
