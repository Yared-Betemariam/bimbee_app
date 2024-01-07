import React, { useState } from "react";
import Logo from "./Logo";
import { Link, NavLink } from "react-router-dom";

import NavLinks from "./NavLinks";
import ProfileSection from "./ProfileSection";

const Header = ({ user, logout }) => {
  const [IsHovering, setIsHovering] = useState(false);
  const navLinks = [
    {
      name: "Spelling Test",
      path: "test",
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
  return (
    <header className="flex flex-col h-18 bg-gray-900 bg-opacity-90">
      <section className=" max-w-7xl mx-auto w-full flex items-center justify-between px-6 py-3 md:py-4 h-full  relative">
        <Link to="/dashboard">
          <Logo className=" text-gradient-to-b text-orange-400" />
        </Link>
        <NavLinks navLinks={navLinks} />
        <ProfileSection
          IsHovering={IsHovering}
          logout={logout}
          user={user}
          profileHelpers={profileHelpers}
          setIsHovering={setIsHovering}
        />
      </section>
    </header>
  );
};

export default Header;
