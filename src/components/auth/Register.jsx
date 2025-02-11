import React, { useState } from "react";
import loginImage from "../../assets/expense-login.jpg";
import { FaUserCircle } from "react-icons/fa";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null); // State for handling errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    console.log("User registered with:", {
      fullName,
      email,
      phoneNumber,
      password,
    });
  };

  return (
    <div className=" bg-gradient-to-br from-[#a117c7] via-[#3b82f6] to-[#4943c2]">
      <div className="sm:max-w-[31.25rem] mx-auto sm:mt-3 max-w-96 bg-white shadow-lg rounded-lg overflow-hidden  sm:mt-5 md:mt-0 md:min-h-[90vh] min-h-[90vh] sm:h-[40.5rem] md:max-w-screen-md sm:h-[39rem] md:h-[35rem]">
        <div className="grid grid-cols-1 md:h-full  md:grid-cols-2 place-items-center bg-gradient-to-br from-[#a117c7] via-[#3b82f6] to-[#4943c2]">
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
                type="text"
                placeholder="Full Name"
                className="w-full p-2 border border-gray-300 rounded bg-white/30 text-white"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded bg-white/30 text-white"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                pattern="[0-9]{10}"
                title="Phone number should be 10 digits"
                className="w-full p-2 border border-gray-300 rounded bg-white/30 text-white"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                minLength="6"
                className="w-full p-2 border border-gray-300 rounded bg-white/30 text-white"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                minLength="6"
                className="w-full p-2 border border-gray-300 rounded bg-white/30 text-white"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error && (
                <p className="font-bold mt-2 text-red-500 p-2">{error}</p>
              )}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#1e3a8a] via-[#3b82f6] to-[#60a5fa] text-white p-2 rounded font-semibold text-2xl hover:cursor-pointer"
              >
                Register
              </button>
            </form>

            <div className="mt-4 text-center text-xl">
              <p className="text-lg font-semibold text-white">
                Already have an account?{" "}
                <button className="text-lg font-bold text-gradient-pink bg-gradient-to-r from-[#ff7f50] via-[#ff1493] to-[#d500f9] hover:bg-gradient-to-l px-4 py-2 rounded transition-all duration-200 cursor-pointer">
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
