import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllPosts } from "../actions/postActions";
import Post from "../components/Post";
import { useLocation } from "react-router-dom";
import { CLEARPOSTS } from "../constants/actionTypes";

import { CircularProgress, Skeleton } from "@mui/material";
import { ArrowBigDown, ArrowBigUp, MessageSquare } from "lucide-react";

const Home = () => {
  const { posts, noOfPages, isLoading } = useSelector((state) => state?.posts);

  const location = useLocation();

  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  //fetch all posts
  useEffect(() => {
    dispatch(getAllPosts(page));
  }, [dispatch, page]);

  useEffect(() => {
    dispatch({ type: CLEARPOSTS });
  }, [location]);

  //infinitely scroll
  const handleInfiniteScroll = async () => {
    try {
      if (
        page <= noOfPages &&
        window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    //clear
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [page, noOfPages]);

  return (
    <div className="flex gap-4 justify-center pt-28 pb-40">
      <div className="flex flex-col grid-cols-3 gap-4">
        {posts.map((post) => (
          <Post key={post?._id} post={post} />
        ))}
        {isLoading && (
          <div className="mx-1 p-2 text-slate-800 bg-gray-50 w-[389px] rounded-xl shadow">
            <div role="button">
              <p className="flex justify-end">
                <Skeleton width={40} style={{ fontSize: "12px" }} />
              </p>
              <div className="flex items-center gap-2">
                <Skeleton variant="circular" width={40} height={40} />
                <p>
                  <Skeleton variant="text" width={80} />
                </p>
              </div>
              <div className="mt-2">
                <Skeleton variant="text" />
              </div>
              <div className="mt-2">
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </div>
            </div>
            <div className="flex gap-6 text-slate-500 text-xs mt-4">
              <div className="p-1 rounded-md  flex gap-2">
                <button>
                  {" "}
                  <ArrowBigUp size={18} />
                </button>

                <p>
                  {" "}
                  <CircularProgress color="inherit" size={14} />
                </p>

                <button>
                  {" "}
                  <ArrowBigDown size={18} />
                </button>
              </div>
              <div
                role="button"
                className="flex gap-2 items-center p-1 rounded-md"
              >
                <MessageSquare size={14} />
                <p>
                  {" "}
                  <CircularProgress color="inherit" size={14} />
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
