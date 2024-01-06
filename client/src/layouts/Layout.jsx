import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <p>Header</p>
      <Outlet />
      <p>Footer</p>
    </>
  );
};

export default Layout;
