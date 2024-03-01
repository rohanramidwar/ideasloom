import React from "react";

const Auth1 = () => {
  return (
    <div className="flex justify-center pt-10">
      <form className="flex flex-col w-72">
        <div className="bg-gray-50 flex flex-col rounded-2xl p-2">
          <div className="py-2 border-b border-gray-300">
            <input
              type="text"
              placeholder="Nickname"
              className="bg-inherit text-lg px-2 outline-none"
            />
          </div>
          <div className="py-2">
            <input
              type="email"
              placeholder="Email"
              className="bg-inherit text-lg px-2 outline-none"
            />
          </div>
          <div className="border-t border-gray-300 py-2">
            <input
              type="password"
              placeholder="Password"
              className="bg-inherit text-lg px-2 outline-none"
            />
          </div>
        </div>
        <button className="w-full bg-gray-50 rounded-2xl text-red-500 font-bold mt-6 p-1 text-lg">
          Sign up
        </button>
        <div
          role="button"
          className="mt-4 text-gray-50 text-sm text-center hover:underline"
        >
          Already a user? Sign in!
        </div>
      </form>
    </div>
  );
};

export default Auth1;
