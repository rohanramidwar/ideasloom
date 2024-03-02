import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { ArrowBigDown, ArrowBigUp, MessageSquare } from "lucide-react";
import moment from "moment";

import profilePic from "../assets/profilePic.gif";

import { getPost } from "../actions/postActions";
import {
  downVote,
  removeDownVote,
  removeUpVote,
  upVote,
} from "../actions/voteActions";
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
  }, [dispatch, id]);

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

  // const { upVotes, downVotes } = post;

  const [isUpVoted, setIsUpVoted] = useState(false);
  const [isDownVoted, setIsDownVoted] = useState(false);

  useEffect(() => {
    setIsUpVoted(
      post?.upVotes.some((upvote) => upvote.user === user?.result?._id)
    );
    setIsDownVoted(
      post?.downVotes.some((downvote) => downvote.user === user?.result?._id)
    );
  }, [post?.downVotes, post?.upVotes]);

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
    <div className="flex h-screen justify-center items-center text-slate-800">
      <div className="p-2 bg-gray-50 sm:w-[479px] shadow">
        <div className="border-b border-gray-300 pb-2">
          <p className="text-xs text-end text-slate-500">
            {" "}
            {moment(post?.createdAt)?.fromNow()}
          </p>
          <div className="flex gap-2">
            <img
              src={profilePic}
              alt="profilePic"
              className="rounded-full w-10 h-10"
            />
            <div>
              <p className="font-medium text-sm">{post?.creator}</p>
              <p className="text-lg font-medium mt-2">{post?.title}</p>
              <p className="text-sm mt-2 break-all">{post?.content}</p>
              <div className="flex gap-6 text-slate-500 text-xs mt-4">
                <div className="flex gap-2">
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
                <div role="button" className="flex gap-2 items-center">
                  <MessageSquare size={14} />
                  <p>{post?.comments?.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <form onSubmit={submitComment} className="flex gap-2 w-full">
            <input
              onChange={handleChange}
              name="text"
              type="text"
              placeholder="Add a comment"
              className="px-1 h-6 text-sm w-full bg-inherit rounded-md outline-none border border-gray-300"
            />
            <button
              type="submit"
              className="active:scale-95 bg-red-500 text-slate-50 font-medium rounded-md px-1 shadow-md"
            >
              POST
            </button>
          </form>

          <div className="flex mt-2">
            <p className="px-2 pb-1 text-sm font-bold bg-emerald-500 rounded-2xl text-slate-50">
              <span>{post?.comments?.length}</span> Comments
            </p>
          </div>

          <div className="mt-2 flex flex-col gap-2">
            {post?.comments?.map((comment) => (
              <div className="flex gap-2">
                <img
                  src={profilePic}
                  alt="profilePic"
                  className="rounded-full w-5 h-5"
                />
                <div>
                  <p className="font-medium text-sm">{comment?.user}</p>
                  <p className="text-sm break-all">{comment?.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
