import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Footer, Header } from "../components";

const Layout = ({ user, setUser }) => {
  const navigate = useNavigate();
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user_jwt");
    navigate("/auth");
    return;
  };

  return (
    <div className="flex flex-col bg-gray-800 min-h-screen">
      <Header user={user} logout={logout} />
      <main className="flex flex-col bg-gray-900 bg-opacity-70 flex-1 w-full text-white">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
