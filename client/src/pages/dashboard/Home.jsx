import React from "react";
import { LoginBG } from "../../assets";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="relative sm:h-1/2">
        <img
          className="rounded-xl object-cover object-center sm:max-h-[50vh]"
          src={LoginBG}
          alt=""
        />
        <div className="sm:text-gray-900 text-white font-medium sm:absolute top-0 left-0 px-8 py-6 md:px-14 md:py-12 flex flex-col gap-4 lg:gap-4 lg:text-xl tracking-tight leading-5 bottom-0 lg:leading-6 text-lg md:max-w-[60%] lg:max-w-[50%]">
          <h1 className="text-4xl font-extrabold font-out lg:text-5xl">
            Improve your Spellings
          </h1>
          <p>
            Here we word to improve you spellings in english with selected words
            by our fellow english teachers.
          </p>
          <p>To getstarted using click here</p>
          <Link to="words" className="mr-auto">
            <div className="bg-gray-800 rounded-md px-8  py-3 shadow-md hover:translate-x-1 transition-all duration-300 active:scale-105 text-white font-semibold my-1">
              Get Started
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
