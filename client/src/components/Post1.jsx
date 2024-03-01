import React from "react";
import { ArrowBigDown, ArrowBigUp, MessageSquare } from "lucide-react";

import profilePic from "../assets/profilePic.gif";

const Post1 = () => {
  return (
    <div className="flex h-screen justify-center items-center text-slate-800">
      <div className="p-2 bg-gray-50 w-[389px] rounded-xl shadow">
        <p className="text-xs text-end text-slate-500">3m ago</p>
        <div className="flex items-center gap-2">
          <img
            src={profilePic}
            alt="profilePic"
            className="rounded-full w-10 h-10"
          />
          <p className="font-medium text-sm">Rohan</p>
        </div>
        <p className="text-lg font-medium mt-2">TMKOC</p>
        <p className="text-sm mt-2 break-all">
          Happy Leap Day, everyone! We would like to announce 7dead, a panfandom
          jamjar roleplaying game set in the city of 7, a cyperpunk-themed city
          that changes based on which of the 7 deadly sins and 7 deadly virtues
          has flourished the most in the hearts of the citizens.
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
  );
};

export default Post1;
