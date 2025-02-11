import React, { useState } from "react";
import loginImage from "../../assets/expense-login.jpg"; // Make sure the path matches
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can add your login functionality
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    console.log("User logged in with:", { email, password });
  };

  return (
    <div className="bg-gradient-to-br from-[#a117c7] via-[#3b82f6] to-[#4943c2]">
      <div className="sm:max-w-[31.25rem] mx-auto sm:mt-3 max-w-96 bg-white shadow-lg rounded-lg overflow-hidden sm:mt-5 md:mt-0 md:min-h-[90vh] min-h-[90vh] sm:h-[40.5rem] md:max-w-screen-md sm:h-[39rem] md:h-[35rem]">
        <div className="grid grid-cols-1 md:h-full md:grid-cols-2 place-items-center bg-gradient-to-br from-[#a117c7] via-[#3b82f6] to-[#4943c2]">
          <div className="pt-10">
            <img
              src={loginImage}
              alt="Login"
              className="md:w-full md:h-full object-cover md:mt-5"
            />
          </div>
          <div className="pt-24 px-8">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded bg-white/30 text-white"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded bg-white/30 text-white"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <p className="font-bold mt-2 text-red-500 p-2">{error}</p>
              )}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#1e3a8a] via-[#3b82f6] to-[#60a5fa] text-white p-2 rounded font-semibold text-2xl hover:cursor-pointer"
              >
                Login
              </button>
            </form>

            <div className="mt-6 text-center text-xl">
              <p className="text-lg font-semibold text-white">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-lg font-bold text-gradient-pink bg-gradient-to-r from-[#ff7f50] via-[#ff1493] to-[#d500f9] hover:bg-gradient-to-l px-4 py-2 rounded transition-all duration-200 cursor-pointer"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
