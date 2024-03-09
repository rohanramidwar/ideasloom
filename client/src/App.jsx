import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import PostDetails from "./components/PostDetails";
import Settings from "./components/Settings";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import CreateNewPost from "./pages/CreateNewPost";

const App = () => {
  return (
    <div className="bg-[#edeaef] min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/create" element={<CreateNewPost />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
