import { CircularProgress, Skeleton } from "@mui/material";
import { ArrowBigDown, ArrowBigUp, MessageSquare } from "lucide-react";
import React from "react";
import dummy from "../../assets/dummy.svg";

const PostDetailsSkeleton = () => {
  return (
    <div className="py-2 rounded-xl bg-gray-50 w-full sm:w-[479px] shadow-sm">
      <div className="px-2 border-b border-gray-300 pb-2">
        <p className="flex justify-end">
          <Skeleton width={40} style={{ fontSize: "12px" }} />
        </p>
        <div className="flex gap-2">
          <div>
            <Skeleton variant="circular" width={40} height={40} />
          </div>
          <div className="w-full">
            <p>
              <Skeleton variant="text" width={80} />
            </p>

            <div className="mt-2">
              <Skeleton variant="text" />
            </div>
            <div className="mt-2">
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </div>

            <div className="flex gap-6 text-slate-500 text-xs mt-4">
              <div className="p-1 rounded-md  flex gap-2">
                <button>
                  {" "}
                  <ArrowBigUp size={18} />
                </button>

                <p>
                  {" "}
                  <CircularProgress color="inherit" size={14} />
                </p>

                <button>
                  {" "}
                  <ArrowBigDown size={18} />
                </button>
              </div>
              <div
                role="button"
                className="flex gap-2 items-center p-1 rounded-md"
              >
                <MessageSquare size={14} />
                <p>
                  {" "}
                  <CircularProgress color="inherit" size={14} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-2 overflow-auto max-h-60">
        <div className="px-2 flex gap-2">
          <p className="px-2 pb-1 text-sm font-bold bg-emerald-500 rounded-2xl text-slate-50">
            <span>
              <CircularProgress color="inherit" size={14} />
            </span>{" "}
            Votes
          </p>
          <p className="px-2 pb-1 text-sm font-bold bg-sky-500 rounded-2xl text-slate-50">
            <span>
              <CircularProgress color="inherit" size={14} />
            </span>{" "}
            Comments
          </p>
        </div>
      </div>
      <form className="px-2 flex pt-2 border-t border-gray-300 gap-2 w-full">
        <img
          src={dummy}
          alt="profilePic"
          width={40}
          height={40}
          className="rounded-md"
        />
        <input
          name="text"
          type="text"
          placeholder="Add a comment"
          className="rounded-md px-1 w-full bg-inherit outline-none border border-gray-300"
        />
        <button
          type="submit"
          className="tracking-wide  hover:scale-105 bg-[#ff574d] text-slate-50 font-medium p-1 rounded-md shadow-sm"
        >
          POST
        </button>
      </form>
    </div>
  );
};

export default PostDetailsSkeleton;
