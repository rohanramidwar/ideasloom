import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import toast from "react-hot-toast";
import { ArrowBigDown, ArrowBigUp, MessageSquare } from "lucide-react";

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
    if (!user) {
      toast.error("Please sign in first");
    } else {
      dispatch(upVote(post?._id));
      if (isDownVoted) dispatch(removeDownVote(post?._id));
    }
  };
  const handleRemoveUpVote = () => {
    if (!user) {
      toast.error("Please sign in first");
    } else {
      dispatch(removeUpVote(post?._id));
    }
  };
  const handleDownVote = () => {
    if (!user) {
      toast.error("Please sign in first");
    } else {
      dispatch(downVote(post?._id));
      if (isUpVoted) dispatch(removeUpVote(post?._id));
    }
  };
  const handleRemoveDownVote = () => {
    if (!user) {
      toast.error("Please sign in first");
    } else {
      dispatch(removeDownVote(post?._id));
    }
  };

  return (
    <div className="mx-2 p-2 text-slate-800 bg-gray-50 sm:w-[389px] rounded-xl shadow-sm ">
      <div role="button" onClick={openPost}>
        <p className="text-xs text-end text-slate-500">
          {moment(post?.createdAt)?.fromNow()}
        </p>
        <div className="flex items-center gap-2">
          <img
            src={post?.profilePic}
            alt="profilePic"
            className="rounded-full w-10 h-10"
          />
          <p className="font-medium ">{post?.creator}</p>
        </div>
        <p className="text-lg font-medium mt-2">{post?.title}</p>
        <p className=" mt-2 text-justify break-all">{post?.content}</p>
      </div>
      <div className="flex gap-6 text-slate-500 text-xs mt-4">
        <div className="p-1 rounded-md flex gap-2">
          {isUpVoted ? (
            <button>
              {" "}
              <ArrowBigUp
                onClick={handleRemoveUpVote}
                className="text-green-500 fill-green-500"
                size={18}
              />
            </button>
          ) : (
            <button>
              {" "}
              <ArrowBigUp onClick={handleUpVote} size={18} />
            </button>
          )}
          <p>{post?.upVotes?.length - post?.downVotes?.length}</p>

          {isDownVoted ? (
            <button>
              {" "}
              <ArrowBigDown
                onClick={handleRemoveDownVote}
                className="text-red-500 fill-red-500"
                size={18}
              />
            </button>
          ) : (
            <button>
              {" "}
              <ArrowBigDown onClick={handleDownVote} size={18} />
            </button>
          )}
        </div>

        <div
          onClick={openPost}
          role="button"
          className="flex gap-2 items-center p-1 rounded-md hover:text-gray-50 hover:bg-sky-600"
        >
          <MessageSquare size={14} />
          <p>{post?.comments?.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
