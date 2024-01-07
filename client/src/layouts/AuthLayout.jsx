import React from "react";
import { LoginBG } from "../assets";
import { Outlet } from "react-router-dom";

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
        <Outlet />
      </section>
    </main>
  );
};

export default Authentication;
