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
    <div>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <>
            <label>Nickname</label>
            <input
              name="name"
              type="text"
              placeholder="Enter nickname"
              onChange={handleChange}
            />
          </>
        )}
        <label>Email</label>
        <input
          name="email"
          type="email"
          placeholder="Enter email"
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          name="password"
          type="password"
          placeholder="Enter password"
          onChange={handleChange}
        />
        <button type="submit">Sign up</button>

        <div role="button" onClick={switchMode}>
          {isSignup ? "Already a user? Sign in!" : "New user? Sign up!"}
        </div>
      </form>
    </div>
  );
};

export default Auth;
