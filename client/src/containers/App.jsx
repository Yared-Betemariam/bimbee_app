import React, { Suspense, useEffect, useState } from "react";

import {
  Link,
  Navigate,
  Route,
  Routes,
  redirect,
  useNavigate,
} from "react-router-dom";

import {
  Analysis,
  Authentication,
  Dashboard,
  DashboardHome,
  Login,
  PageNotFound,
  Signup,
  SpellingTest,
  UserProfile,
  WordList,
  WordOfTheDay,
} from "../pages";
import { AuthLayout, Layout } from "../layouts";
import { getLoggedInUser } from "../network/users_api";
import { Spinner } from "../components";
import TestSimulation from "../pages/dashboard/spellingtest/TestSimulation";

const App = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("user_jwt");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) navigate("/auth");
    const getUser = async () => {
      setLoading(true);
      try {
        const res = await getLoggedInUser();
        setUser(res);
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
        navigate("/auth");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <h1 className="text-2xl font-semibold text-orange-400">Loading...</h1>
      </div>
    );

  return (
    <Suspense fallback={<div>Loading..</div>}>
      <Routes>
        {/* client users */}
        <Route path="/" element={<Layout setUser={setUser} user={user} />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="words" element={<WordList />} />
            <Route path="word" element={<WordOfTheDay />} />
          </Route>
          <Route path="analysis" element={<Analysis />} />
          <Route path="tests" element={<SpellingTest />} />
          <Route path="test" element={<TestSimulation />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        {/* auth layout */}
        <Route path="auth" element={<AuthLayout />}>
          <Route index element={<Authentication />} />
          <Route path="login" element={<Login setUser={setUser} />} />
          <Route path="signup" element={<Signup setUser={setUser} />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
