import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signin, signup } from "../actions/authActions";

import boy from "../assets/boy.svg";
import luffy from "../assets/luffy.svg";
import naruto from "../assets/naruto.svg";
import simson from "../assets/simson.svg";
import girl from "../assets/girl.svg";
import girl_1 from "../assets/girl_1.svg";
import girl_2 from "../assets/girl_2.svg";
import ronaldo from "../assets/ronaldo.svg";
import jethalal from "../assets/jethalal.svg";
import viratkohli from "../assets/viratkohli.svg";

const Auth = () => {
  const profilePics = [
    boy,
    girl,
    girl_1,
    girl_2,
    luffy,
    naruto,
    simson,
    ronaldo,
    jethalal,
    viratkohli,
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const [isSignup, setIsSignup] = useState(false);

  const switchMode = () => {
    setIsSignup(!isSignup);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formDataWithPic = formData;

    if (!selectedAvatar) {
      const randomIndex = Math.floor(Math.random() * profilePics.length);
      const randomPic = profilePics[randomIndex];
      formDataWithPic = { ...formData, profilePic: randomPic };
    } else {
      formDataWithPic = { ...formData, profilePic: selectedAvatar };
    }

    if (isSignup) dispatch(signup(formDataWithPic, navigate));
    else dispatch(signin(formData, navigate));
  };

  return (
    <div className="flex justify-center items-center bg-[#ff574d] min-h-screen">
      <form className="flex flex-col w-72" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-black text-slate-50 mb-4 text-center">
          {isSignup ? "Sign up" : "Welcome back!"}
        </h1>
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
        {isSignup && (
          <p className="mt-4 text-lg font-medium text-slate-50 text-center">
            Select avatar
          </p>
        )}
        {isSignup && (
          <div className="flex flex-wrap justify-center mt-4">
            {profilePics.map((pic, index) => (
              <img
                key={index}
                src={pic}
                alt={`Avatar ${index}`}
                className={`w-12 h-12 rounded-full m-1 cursor-pointer ${
                  selectedAvatar === pic ? "border-4 border-red-500" : ""
                }`}
                onClick={() => handleAvatarSelect(pic)}
              />
            ))}
          </div>
        )}

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
          className="mt-4 text-sm text-gray-50 text-center hover:underline"
        >
          {isSignup ? "Already a user? Sign in!" : "New user? Sign up!"}
        </div>
      </form>
    </div>
  );
};

export default Auth;
