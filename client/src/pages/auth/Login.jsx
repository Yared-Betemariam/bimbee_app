import React, { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { ErrorOccured } from "../../components";
import { getLoggedInUser, logUserIn } from "../../network/users_api";
import { useLocation, useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [FormData, setFromData] = useState({
    username: "",
    password: "",
  });
  const [errorMsg, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await logUserIn(FormData);
      setUser({ ...res.user, token: res.token });
      localStorage.setItem("user_jwt", JSON.stringify(res.token));
      window.location.reload();
    } catch (error) {
      const errorRes = await error.response;
      const errorData = errorRes.data;
      setError(errorData.error_message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold text-center mb-4">
        Login to your Account
      </h1>
      {errorMsg && <ErrorOccured label={errorMsg} />}
      <form className="flex flex-col gap-4 font-medium" onSubmit={handleSubmit}>
        <fieldset className="flex flex-col gap-1">
          <p>Username</p>
          <input
            className="w-full px-5 py-3 rounded-md bg-black text-white bg-opacity-60 placeholder:text-white placeholder:opacity-60"
            type="text"
            required
            placeholder="John"
            value={FormData.username}
            onChange={(e) =>
              setFromData((prev) => ({ ...prev, username: e.target.value }))
            }
          />
        </fieldset>
        <fieldset className="flex flex-col gap-1">
          <p>Password</p>
          <div className=" relative flex">
            <input
              className="w-full px-5 py-3 rounded-md bg-black text-white bg-opacity-60 placeholder:text-white placeholder:opacity-60"
              type={passwordVisible ? "text" : "password"}
              required
              placeholder="Your Password"
              value={FormData.password}
              onChange={(e) =>
                setFromData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <div
              className=" absolute right-4 text-white py-3 font-medium text-2xl"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <MdVisibilityOff /> : <MdVisibility />}
            </div>
          </div>
        </fieldset>
        <button
          disabled={loading ? true : false}
          className={`bg-gray-900 text-white hover:opacity-90 mt-4 transition-all active:scale-105 rounded-md py-3 px-4
            ${loading ? "opacity-50" : ""}`}
        >
          {loading ? "Logging In..." : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default Login;
