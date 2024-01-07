import React from "react";
import { Link } from "react-router-dom";

const Authentication = () => {
  return (
    <>
      <div className="flex justify-center items-center flex-col gap-2 font-medium text-black">
        <h1 className="text-2xl uppercase font-bold">Welcome</h1>
        <p>Sign-in to imporve your spellings</p>
      </div>
      <div className="flex gap-2 flex-col">
        <Link to="signup">
          <button className="w-full flex justify-center items-center transition-all duration-300 gap-4 text-white hover:bg-opacity-80 px-4 bg-gray-900 shadow py-3 active:scale-105 rounded-md font-medium">
            Sign Up
          </button>
        </Link>
        <Link to="login">
          <button className="w-full flex justify-center items-center transition-all duration-300 gap-4 hover:bg-gray-900 border-2 border-gray-900 hover:bg-opacity-5 px-4 shadow py-3 active:scale-105 rounded-md font-semibold">
            Log In
          </button>
        </Link>
      </div>
    </>
  );
};

export default Authentication;
