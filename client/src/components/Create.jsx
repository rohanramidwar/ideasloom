import React from "react";

const Create = () => {
  return (
    <div className="flex h-screen justify-center items-center text-slate-800">
      <div className="bg-gray-50 p-2 w-[657px]">
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Title"
            className="px-1 h-9 text-lg font-medium w-full bg-inherit rounded-md outline-none border border-gray-300"
          />
          <textarea
            type="text"
            placeholder="Go ahead, put anything"
            className="px-1 h-9 text-sm w-full bg-inherit rounded-md outline-none border border-gray-300"
          />
          <div className="flex justify-end gap-2">
            <button
              //   type="submit"
              className="text-lg active:scale-95 bg-red-500 text-slate-50 font-medium rounded-md px-1 shadow-md"
            >
              POST
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
