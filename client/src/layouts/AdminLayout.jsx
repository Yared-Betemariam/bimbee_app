import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <p>Adim H</p>
      <Outlet />
      <p>Admin F</p>
    </>
  );
};

export default AdminLayout;
