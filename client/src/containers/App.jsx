import React, { Suspense } from "react";

import { Route, Routes } from "react-router-dom";

import { AdminHome, Authentication, Home, UserProfile } from "../pages";
import { AdminLayout, Layout, AuthLayout } from "../layouts";

const App = () => {
  return (
    <Suspense fallback={<div>Loading..</div>}>
      <Routes>
        {/* client users */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile/:uid" element={<UserProfile />} />
        </Route>
        {/* admin layout */}
        {/* admin user */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
        </Route>
        {/* auth layout */}
        <Route path="auth" element={<AuthLayout />}>
          <Route index element={<Authentication />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
