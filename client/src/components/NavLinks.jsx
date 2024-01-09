import React from "react";
import { NavLink } from "react-router-dom";

const NavLinks = ({ navLinks }) => {
  return (
    <div>
      <nav className="flex flex-col md:flex-row capitalize text-white gap-4">
        {navLinks.map((navLink) => (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "underline hover:-translate-y-[2px] acitve:scale-105 transition-all "
                : " hover:-translate-y-[2px] acitve:scale-105 transition-all "
            }
            key={navLink.path}
            to={navLink.path}
          >
            {navLink.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default NavLinks;
