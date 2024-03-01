import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getAllPosts } from "../actions/postActions";
import Post from "../components/Post";

const Home = () => {
  const { posts } = useSelector((state) => state?.posts);

  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  //fetch all posts
  useEffect(() => {
    dispatch(getAllPosts(page));
  }, [dispatch, page]);

  //infinitely scroll
  const handleInfiniteScroll = async () => {
    try {
      if (
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
  }, []);

  return (
    <div>
      <Link to="/create">
        <button>Create Post</button>
      </Link>
      <Link to="/settings">
        <button>Settings</button>
      </Link>

      <div>
        {posts.map((post) => (
          <Post key={post?._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
