import React from "react";
import { Menu } from "@headlessui/react";

import profilePic from "../assets/profilePic.gif";

const Navbar1 = () => {
  return (
    <div className="flex justify-between items-center h-11 bg-[#ff675e] px-7">
      <p className="font-medium text-lg text-slate-50">ideasloom</p>
      {/* <button className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 hover:scale-105 text-zinc-50 font-medium rounded-md text-lg">
        Sign in
      </button> */}
      <div>
        <Menu as="div" className="relative flex">
          <Menu.Button>
            <img
              src={profilePic}
              alt="profilePic"
              className="rounded-xl w-10 h-10"
            />
          </Menu.Button>
          <Menu.Items
            as="div"
            className="flex flex-col justify-start w-[221px] bg-gray-50 shadow rounded-xl p-2 absolute top-11 -right-2"
          >
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`p-2 text-start ${
                    active && "bg-gray-200 rounded-md"
                  }`}
                >
                  Create a post
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`p-2 text-start ${
                    active && "bg-gray-200 rounded-md"
                  }`}
                >
                  Settings
                </button>
              )}
            </Menu.Item>
            <div className="border border-gray-300 my-1"></div>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`p-2 text-start ${
                    active && "bg-gray-200 rounded-md"
                  }`}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar1;
