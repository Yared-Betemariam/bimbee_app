import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaTableList } from "react-icons/fa6";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";

const Dashboard = () => {
  const links = [
    {
      icon: <FaTableList />,
      name: "Word List",
      path: "words",
    },
    {
      icon: <GiPerspectiveDiceSixFacesRandom />,
      name: "Word of the Day",
      path: "word",
    },
  ];

  return (
    <div className="flex flex-col  gap-1">
      <section className="">
        <div className="bg-slate-800 py-3 px-6 bg-opacity-80">
          <section className="flex flex-col max-w-7xl mx-auto w-full">
            <div className="flex gap-4">
              {links.map((link) => (
                <NavLink
                  className=" font-medium active:opacity-70 hover:scale-95 transition-all items-center ease-in-out flex gap-[-10px]"
                  key={link.name}
                  to={link.path}
                >
                  <div className="bg-orange-400 shadow-md text-white p-2 rounded-full text-xl absolute">
                    {link.icon}
                  </div>
                  <p className="shadow-md bg-black bg-opacity-25 px-6 py-1 rounded-r-full ml-6">
                    {link.name}
                  </p>
                </NavLink>
              ))}
            </div>
          </section>
        </div>
        <div>
          <section className="flex flex-col max-w-7xl mx-auto w-full px-6 py-4">
            <Outlet />
          </section>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
