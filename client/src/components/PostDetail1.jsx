import React from "react";
import { ArrowBigDown, ArrowBigUp, MessageSquare } from "lucide-react";

import profilePic from "../assets/profilePic.gif";

const PostDetail1 = () => {
  return (
    <div className="flex h-screen justify-center items-center text-slate-800">
      <div className="p-2 bg-gray-50 sm:w-[479px] shadow">
        <div className="border-b border-gray-300 pb-2">
          <p className="text-xs text-end text-slate-500">3m ago</p>
          <div className="flex gap-2">
            <img
              src={profilePic}
              alt="profilePic"
              className="rounded-full w-10 h-10"
            />
            <div>
              <p className="font-medium text-sm">Rohan</p>
              <p className="text-lg font-medium mt-2">TMKOC</p>
              <p className="text-sm mt-2 break-all">
                Happy Leap Day, everyone! We would like to announce 7dead, a
                panfandom jamjar roleplaying game set in the city of 7, a
                cyperpunk-themed city that changes based on which of the 7
                deadly sins and 7 deadly virtues has flourished the most in the
                hearts of the citizens.
              </p>
              <div className="flex gap-6 text-slate-500 text-xs mt-4">
                <div className="flex gap-2">
                  <button>
                    {" "}
                    <ArrowBigUp size={18} />
                  </button>
                  <p>0</p>
                  <button>
                    {" "}
                    <ArrowBigDown size={18} />
                  </button>
                </div>
                <div role="button" className="flex gap-2 items-center">
                  <MessageSquare size={14} />
                  <p>0</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-2 w-full"
          >
            <input
              type="text"
              placeholder="Add a comment"
              className="px-1 text-sm w-full bg-inherit rounded-md outline-none border border-gray-300"
            />
            <button
              //   type="submit"
              className="active:scale-95 bg-red-500 text-slate-50 font-medium rounded-md px-1 shadow-md"
            >
              POST
            </button>
          </form>

          <div className="flex mt-2">
            <p className="px-2 pb-1 text-sm font-bold bg-emerald-500 rounded-2xl text-slate-50">
              <span>3</span> Comments
            </p>
          </div>

          <div className="mt-2">
            <div className="flex gap-2">
              <img
                src={profilePic}
                alt="profilePic"
                className="rounded-full w-5 h-5"
              />
              <div>
                <p className="font-medium text-sm">Rohan</p>
                <p className="text-sm break-all">Thanks for sharing!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail1;
