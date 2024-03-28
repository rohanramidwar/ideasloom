import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { CircularProgress, Skeleton } from "@mui/material";
// import { ArrowBigDown, ArrowBigUp, MessageSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { getAllPosts } from "../actions/postActions";
import Post from "../components/Post";
import { CLEARPOSTS } from "../constants/actionTypes";

import dummy from "../assets/dummy.svg";
import PostSkeleton from "../components/skeletons/PostSkeleton";

const Home = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const { posts, noOfPages, isLoading } = useSelector((state) => state?.posts);

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
    <div className="text-slate-800 flex gap-4 justify-center pt-20 pb-30">
      <div className="w-full sm:w-auto sm:relative">
        <div className="w-full flex sm:w-auto flex-col gap-4">
          <Link to="/create">
            <div className="flex gap-2 mx-2 p-2 rounded-xl sm:w-[389px] bg-gray-50">
              <img
                src={user ? user?.result?.profilePic : dummy}
                alt="profilePic"
                width={40}
                height={40}
                className="rounded-md"
              />
              <input
                className="bg-inherit outline-none border border-gray-300 w-full rounded-md text-lg px-1"
                type="text"
                placeholder="Go ahead, put anything"
              />
              <button
                type="submit"
                className="tracking-wide hover:scale-105 bg-[#ff574d] text-slate-50 font-medium p-1 rounded-md shadow-sm"
              >
                POST
              </button>
            </div>
          </Link>
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <Post key={post?._id} post={post} />
            ))}
            {isLoading &&
              (page === 1 ? (
                <>
                  <PostSkeleton />
                  <PostSkeleton />
                  <PostSkeleton />
                  <PostSkeleton />
                </>
              ) : (
                <PostSkeleton />
              ))}
          </div>
        </div>
        <div>
          <div className="hidden absolute left-[405px] top-0 p-2 sm:flex flex-col w-80 rounded-xl bg-gray-50 shadow-sm">
            <p className="break-all text-justify text-lg">
              We are place for individuals to share and explore ideas together
              and join in meaningful discussions. Have something to share?
            </p>

            <div className="flex justify-end">
              <Link to="/create">
                <button className="tracking-wide hover:scale-105 mt-4 p-2 rounded-md text-lg bg-[#ff574d] text-gray-50 font-medium">
                  Create a post
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
