import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createPost } from "../actions/postActions";

import naruto from "../assets/naruto.svg";

const CreateNewPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  //result and token
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    creator: user?.result?.name,
    profilePic: user?.result?.profilePic,
  });

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in first");
    } else {
      dispatch(createPost(postData, navigate));
      setPostData({
        title: "",
        content: "",
        creator: user?.result?.name,
        profilePic: user?.result?.profilePic,
      });
    }
  };

  // const clearInput = () => {
  //   setPostData({
  //     title: "",
  //     content: "",
  //     creator: user?.result?.name,
  //   });
  // };

  return (
    <div className="flex justify-center pt-20 bg-[#eeebf0] h-screen text-slate-800">
      <div className="flex gap-4">
        <div className="hidden sm:block">
          <img
            className="rounded-md shadow-sm"
            width={80}
            height={80}
            src={user ? user?.result?.profilePic : naruto}
            alt="profilePic"
          />
        </div>
        <div>
          <div className="rounded-xl bg-gray-50 p-2 shadow-sm w-[389px] sm:w-[479px]">
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <input
                name="title"
                type="text"
                placeholder="Add an intresting title"
                value={postData.title}
                onChange={handleChange}
                className="text-xl font-medium border border-gray-300 px-1 w-full bg-inherit rounded-md outline-none"
              />
              <textarea
                name="content"
                type="text"
                placeholder="Go ahead, put anything"
                value={postData.content}
                onChange={handleChange}
                rows={3}
                maxLength={280}
                className="text-lg w-full border border-gray-300 px-1 bg-inherit rounded-md outline-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="text-lg bg-[#ff574d] text-slate-50 font-medium rounded-md p-2 shadow-sm hover:scale-105"
                >
                  POST
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPost;
