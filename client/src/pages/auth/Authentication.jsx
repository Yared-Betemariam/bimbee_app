import React from "react";
import { LoginBG } from "../../assets";
import { Logo } from "../../components";

const Authentication = () => {
  return (
    <main
      style={{
        background: `url(${LoginBG})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="min-h-screen opacity-90 flex justify-center items-center"
    >
      <section className="w-full max-w-md px-6 py-12 rounded-xl backdrop-blur border-2 bg-orange-500 bg-opacity-35 border-black flex flex-col gap-12 border-opacity-15 shadow-md">
        <div className="flex justify-center items-center flex-col gap-2 font-medium text-black">
          <h1 className="text-2xl uppercase font-bold">Welcome</h1>
          <p>Sign-in to imporve your spellings</p>
        </div>
        <div className="flex gap-2 flex-col">
          <button className="w-full flex justify-center items-center transition-all duration-300 gap-4 text-white hover:bg-opacity-80 px-4 bg-gray-900 shadow py-3 active:scale-105 rounded-md font-medium">
            <p>Sign In</p>
          </button>
          <button className="w-full flex justify-center items-center transition-all duration-300 gap-4 text-black hover:bg-opacity-80 px-4 border-gray-800 border-2 shadow py-3 active:scale-105 rounded-md font-medium">
            <p>Log In</p>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Authentication;
