import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowBigDown, ArrowBigUp, MessageSquare } from "lucide-react";
import moment from "moment";
import toast from "react-hot-toast";

import { getPost } from "../actions/postActions";
import {
  downVote,
  removeDownVote,
  removeUpVote,
  upVote,
} from "../actions/voteActions";
import { addComment } from "../actions/commentActions";

import dummy from "../assets/dummy.svg";
import PostDetailsSkeleton from "./skeletons/PostDetailsSkeleton";

const PostDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  //result and token
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const { id } = useParams(); //post id

  const { post, isLoading } = useSelector((state) => state?.posts);

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  const [commentData, setCommentData] = useState({
    text: "",
    user: user?.result?.name, //user name
    id, //post id
    profilePic: user?.result?.profilePic,
  });

  const handleChange = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  };

  const submitComment = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in first");
    } else {
      dispatch(addComment(commentData));
      setCommentData({
        text: "",
        user: user?.result?.name, //user name
        id, //post id
        profilePic: user?.result?.profilePic,
      });
    }
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
    <div className="flex flex-col items-center pt-20 text-slate-800">
      {!isLoading ? (
        <div className="py-2 rounded-xl bg-gray-50 w-full sm:w-[479px] shadow-sm">
          <div className="px-2 border-b border-gray-300 pb-2">
            <p className="text-xs text-end text-slate-500">
              {" "}
              {moment(post?.createdAt)?.fromNow()}
            </p>
            <div className="flex gap-2">
              <img
                src={post?.profilePic}
                alt="profilePic"
                className="rounded-full w-10 h-10"
              />
              <div>
                <p className="font-medium">{post?.creator}</p>
                <p className="text-lg font-medium mt-2">{post?.title}</p>
                <p className="mt-2 break-all text-justify">{post?.content}</p>
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

          <div className="pt-2  overflow-auto max-h-60">
            <div className="px-2 flex gap-2">
              <p
                className={`px-2 pb-1 text-sm font-bold ${
                  post?.upVotes?.length - post?.downVotes?.length < 0
                    ? "bg-red-500"
                    : "bg-emerald-500"
                } } rounded-2xl text-slate-50`}
              >
                <span>{post?.upVotes?.length - post?.downVotes?.length}</span>{" "}
                Votes
              </p>
              <p className="px-2 pb-1 text-sm font-bold bg-sky-500 rounded-2xl text-slate-50">
                <span>{post?.comments?.length}</span> Comments
              </p>
            </div>

            <div className="mt-2 flex flex-col">
              {post?.comments?.map((comment) => (
                <div
                  key={comment?._id}
                  className="p-2 flex gap-2 hover:bg-gray-100"
                >
                  <img
                    src={comment?.profilePic}
                    alt="profilePic"
                    className="rounded-full w-5 h-5"
                  />
                  <div>
                    <p className="font-medium">{comment?.user}</p>
                    <p className="break-all">{comment?.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form
            onSubmit={submitComment}
            className="px-2 flex pt-2 border-t border-gray-300 gap-2 w-full"
          >
            <img
              src={user ? user?.result?.profilePic : dummy}
              alt="profilePic"
              width={40}
              height={40}
              className="rounded-md"
            />
            <input
              onChange={handleChange}
              name="text"
              type="text"
              required
              value={commentData.text}
              placeholder="Add a comment"
              className="rounded-md px-1 w-full bg-inherit outline-none border border-gray-300"
            />
            <button
              type="submit"
              className="tracking-wide  hover:scale-105 bg-[#ff574d] text-slate-50 font-medium p-1 rounded-md shadow-sm"
            >
              POST
            </button>
          </form>
        </div>
      ) : (
        <PostDetailsSkeleton />
      )}
    </div>
  );
};

export default PostDetails;
