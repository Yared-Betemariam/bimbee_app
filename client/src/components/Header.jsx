import React, { useState } from "react";
import Logo from "./Logo";
import { Link, NavLink, useAsyncError } from "react-router-dom";

import NavLinks from "./NavLinks";
import ProfileSection from "./ProfileSection";
import { AnimatePresence, motion } from "framer-motion";
import { FaLaptopHouse } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { dropleft } from "../animations";

const Header = ({ user, logout }) => {
  const [IsHovering, setIsHovering] = useState(false);
  const navLinks = [
    {
      name: "Spelling Test",
      path: "tests",
    },
    {
      name: "words Analysis",
      path: "analysis",
    },
  ];
  const profileHelpers = [
    {
      name: "Settings",
    },
  ];

  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="flex flex-col h-[4.5rem] bg-gray-900 bg-opacity-90">
      <section className=" max-w-7xl mx-auto w-full flex items-center justify-between px-6 py-3 md:py-4 h-full  relative">
        <Link to="/dashboard">
          <Logo className=" text-gradient-to-b text-orange-400" />
        </Link>
        <div className="hidden md:flex">
          <NavLinks navLinks={navLinks} />
        </div>
        <div className="flex gap-3 items-center">
          <IoMenu
            className="md:hidden hover:opacity-75 active:scale-105 transition-all text-white text-4xl"
            onClick={() => setShowMenu(!showMenu)}
          />
          <ProfileSection
            IsHovering={IsHovering}
            logout={logout}
            user={user}
            profileHelpers={profileHelpers}
            setIsHovering={setIsHovering}
          />
        </div>
      </section>
      {showMenu && (
        <AnimatePresence>
          <motion.div
            {...dropleft}
            className="flex absolute md:hidden px-8 py-4 bg-gray-900 bg-opacity-100 rounded-l-md top-[4.5rem] right-0 z-50 pb-12 w-[40%] bottom-0"
            onClick={() => setShowMenu(!showMenu)}
          >
            <NavLinks navLinks={navLinks} />
          </motion.div>
        </AnimatePresence>
      )}
    </header>
  );
};

export default Header;
