import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signin, signup } from "../actions/authActions";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSignup, setIsSignup] = useState(false);

  const switchMode = () => {
    setIsSignup(!isSignup);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) dispatch(signup(formData, navigate));
    else dispatch(signin(formData, navigate));
  };

  return (
    <div className="flex justify-center items-center bg-[#ff574d] h-screen">
      <form className="flex flex-col w-72" onSubmit={handleSubmit}>
        <div className="bg-gray-50 shadow-sm flex flex-col rounded-2xl px-2 py-1">
          {isSignup && (
            <div className="py-3 border-b border-gray-300">
              <input
                name="name"
                type="text"
                placeholder="Nickname"
                onChange={handleChange}
                className="bg-inherit text-lg px-2 outline-none"
                required
              />
            </div>
          )}

          <div className="py-3">
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="bg-inherit text-lg px-2 outline-none"
              required
            />
          </div>
          <div className="border-t border-gray-300 py-3">
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="bg-inherit text-lg px-2 outline-none"
            />
          </div>
        </div>
        <button
          type="submit"
          className="shadow-sm w-full bg-gray-50 rounded-2xl text-red-500 font-bold mt-6 p-1 text-lg"
          required
        >
          {isSignup ? "Sign up" : "Sign in"}
        </button>
        <div
          role="button"
          onClick={switchMode}
          className="mt-4 text-gray-50 text-sm text-center hover:underline"
        >
          {isSignup ? "Already a user? Sign in!" : "New user? Sign up!"}
        </div>
      </form>
    </div>
  );
};

export default Auth;
