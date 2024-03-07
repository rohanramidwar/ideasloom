import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllPosts } from "../actions/postActions";
import Post from "../components/Post";
import { useLocation } from "react-router-dom";
import { CLEARPOSTS } from "../constants/actionTypes";

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
    <div className="flex flex-col items-center pt-28">
      <div className="flex w-full pl-2 sm:pl-7 my-4">
        <h1 className="font-black text-2xl text-slate-50">Your feed</h1>
      </div>

      <div className="flex flex-col sm:grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <Post key={post?._id} post={post} />
        ))}
        {isLoading && (
          <div className="flex justify-center items-center w-full h-20">
            <p>Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
