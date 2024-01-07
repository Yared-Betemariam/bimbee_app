import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdAccountCircle } from "react-icons/md";

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
        className="flex justify-center items-center gap-2 font-medium text-white  rounded-md bg-black px-4 py-[2.5px] bg-opacity-15 z-50 relative shadow-md"
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
      className="  font-medium absolute right-4 w-64 flex flex-col top-14 rounded-md text-white"
      onMouseLeave={() => setIsHovering((prev) => !prev)}
      onClick={() => setIsHovering((prev) => !prev)}
    >
      <div className="font-out bg-gray-900 rounded-t-md px-4 py-2 bg-opacity-95">
        <h2 className="text-lg ">{user?.username}</h2>
        <p className="opacity-60">{user?.email}</p>
      </div>

      <div className="flex py-3 px-4 flex-col gap-2 rounded-b-md border-orange-600 bg-gray-900 border-l-2 border-b-2 border-r-2 bg-opacity-40 hover:opacity-80 active:scale-95 ease-in-out transition-all">
        {profileHelpers.map((helper) => (
          <p key={helper.name}>{helper.name}</p>
        ))}
        <button
          className="bg-white text-gray-900 rounded-md px-4 py-2 bg-opacity-85  font-semibold hover:opacity-80 active:scale-95 ease-in-out transition-all"
          onClick={logout}
        >
          Sign Out
        </button>
      </div>
    </motion.div>
  );
};

export default ProfileSection;
