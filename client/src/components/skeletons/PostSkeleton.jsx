import { CircularProgress, Skeleton } from "@mui/material";
import { ArrowBigDown, ArrowBigUp, MessageSquare } from "lucide-react";
import React from "react";

const PostSkeleton = () => {
  return (
    <div className="mx-1 p-2 text-slate-800 bg-gray-50 sm:w-[389px] rounded-xl shadow-sm">
      <div role="button">
        <p className="flex justify-end">
          <Skeleton width={40} style={{ fontSize: "12px" }} />
        </p>
        <div className="flex items-center gap-2">
          <Skeleton variant="circular" width={40} height={40} />
          <p>
            <Skeleton variant="text" width={80} />
          </p>
        </div>
        <div className="mt-2">
          <Skeleton variant="text" />
        </div>
        <div className="mt-2">
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </div>
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
        <div role="button" className="flex gap-2 items-center p-1 rounded-md">
          <MessageSquare size={14} />
          <p>
            {" "}
            <CircularProgress color="inherit" size={14} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
