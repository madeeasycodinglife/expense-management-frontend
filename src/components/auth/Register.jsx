import { useContext, useState } from "react";
import loginImage from "../../assets/expense-login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // Import spinner
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state
  const { register, setUser, setUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match!"); // ❌ Show error toast
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await register({
        fullName,
        email,
        password,
        phone,
      });

      console.log("Registration successful:", response);
      toast.success("Registration Successful! Redirecting..."); // ✅ Show success toast

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError(err.message || "Registration failed");
      toast.error("Registration failed! Try again."); // ❌ Show error toast
    }
    setLoading(false); // Stop loading
  };

  return (
    <div className="bg-gradient-to-br from-[#4e76dc] via-[#3abaed] to-[#964dea]">
      <div className="sm:max-w-[31.25rem] mx-auto sm:mt-3 max-w-96 bg-white shadow-lg rounded-lg overflow-hidden sm:mt-5 md:mt-0 md:min-h-[90vh] min-h-[90vh] sm:h-[40.5rem] md:max-w-screen-md sm:h-[39rem] md:h-[35rem]">
        <div className="grid grid-cols-1 md:h-full md:grid-cols-2 place-items-center bg-gradient-to-br from-[#a117c7] via-[#3b82f6] to-[#4943c2]">
          <div className="pt-10 pl-8">
            <img
              src={loginImage}
              alt="Register"
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded bg-white/30 text-white"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
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
                disabled={loading}
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <ClipLoader size={24} color={"#fff"} />
                    <span className="ml-2">Registering...</span>
                  </div>
                ) : (
                  "Register"
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-xl">
              <p className="text-lg font-semibold text-white">
                Already have an account ?{" "}
                <Link
                  to="/login"
                  className="text-lg font-bold text-gradient-pink bg-gradient-to-r from-[#ff7f50] via-[#ff1493] to-[#d500f9] hover:bg-gradient-to-l px-4 py-2 rounded transition-all duration-200 cursor-pointer ml-5"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
