import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdAccountCircle } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";

import { dropdown } from "../animations";

const ProfileSection = ({
  IsHovering,
  setIsHovering,
  user,
  logout,
  profileHelpers,
}) => {
  return (
    <>
      <div
        className="flex justify-center items-center gap-2 font-medium text-white  rounded-md bg-gray-800 px-4 py-[2.5px] bg-opacity-500 z-50 relative shadow-md"
        onMouseEnter={() => setIsHovering((prev) => !prev)}
      >
        <p className=" capitalize font-out">{user?.username}</p>
        <MdAccountCircle className="md:text-[2.75rem] text-[2.5rem]" />
      </div>
      <AnimatePresence>
        {IsHovering && (
          <ProfileDropDown
            user={user}
            profileHelpers={profileHelpers}
            logout={logout}
            setIsHovering={setIsHovering}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const ProfileDropDown = ({ user, profileHelpers, logout, setIsHovering }) => {
  return (
    <motion.div
      {...dropdown}
      className="  font-medium absolute right-4 w-64 flex flex-col md:top-20 top-16 rounded-md text-white border-orange-600 border-t-2 z-50 border-b-2"
      onMouseLeave={() => setIsHovering((prev) => !prev)}
      onClick={() => setIsHovering((prev) => !prev)}
    >
      <div className="font-out bg-gray-900 rounded-t-md px-4 py-2 bg-opacity-95">
        <h2 className="text-lg ">{user?.username}</h2>
        <p className="opacity-60">{user?.email}</p>
      </div>

      <div className="flex py-3 px-4 flex-col gap-2 rounded-b-md bg-gray-900 bg-opacity-70 w-full">
        {profileHelpers.map((helper) => (
          <p
            className="active:scale-95 hover:opacity-80 ease-in-out transition-all "
            key={helper.name}
          >
            {helper.name}
          </p>
        ))}
        <button
          className="bg-white text-gray-900 rounded-md px-4 py-2 bg-opacity-85  font-semibold hover:opacity-80 active:scale-95 ease-in-out transition-all flex items-center gap-4"
          onClick={logout}
        >
          <FaSignOutAlt />
          Sign Out
        </button>
      </div>
    </motion.div>
  );
};

export default ProfileSection;
