import React from "react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="flex bg-gray-900 bg-opacity-90 text-white px-6 py-2 h-24">
      <section className="max-w-7xl flex flex-col justify-center gap-2 mx-auto w-full h-full opacity-70">
        <Logo className="opacity-80 text-2xl" />
        <p className=" opacity-50 text-center">&copy; Copyright BimBee</p>
      </section>
    </footer>
  );
};

export default Footer;
