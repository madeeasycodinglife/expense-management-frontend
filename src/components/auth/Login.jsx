import { useContext, useState } from "react";
import loginImage from "../../assets/expense-login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   toast.success("Login Loaded !");
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields.");
      toast.error("Please fill in all fields!");
      setLoading(false);
      return;
    }

    try {
      const response = await login(email, password);
      console.log("Login successful:", response);

      toast.success("Login Successful! Redirecting...");
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed! Invalid credentials. !!");
      toast.error("Login failed! Invalid credentials. !!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#a117c7] via-[#3b82f6] to-[#4943c2]">
      <div className="sm:max-w-[31.25rem] mx-auto sm:mt-3 max-w-96 bg-white shadow-lg rounded-lg overflow-hidden sm:mt-5 md:mt-0 md:min-h-[90vh] min-h-[90vh] sm:h-[40.5rem] md:max-w-screen-md sm:h-[39rem] md:h-[35rem]">
        <div className="grid grid-cols-1 md:h-full md:grid-cols-2 place-items-center bg-gradient-to-br from-[#a117c7] via-[#3b82f6] to-[#4943c2]">
          <div className="pt-10 pl-8">
            <img
              src={loginImage}
              alt="Login"
              className="md:w-full md:h-full object-cover md:mt-5"
            />
          </div>
          <div className="pt-[4.375rem] px-8">
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
                <p className="mt-4 text-red-600 font-medium border-l-4 border-red-600 p-3 rounded-md bg-white shadow-sm">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#1e3a8a] via-[#3b82f6] to-[#60a5fa] text-white p-2 rounded font-semibold text-2xl hover:cursor-pointer mt-4"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <ClipLoader size={24} color={"#fff"} />
                    <span className="ml-2">Logging in...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-xl">
              <p className="text-lg font-semibold text-white">
                Don't have an account ?{" "}
                <Link
                  to="/register"
                  className="text-lg font-bold text-gradient-pink bg-gradient-to-r from-[#ff7f50] via-[#ff1493] to-[#d500f9] hover:bg-gradient-to-l px-4 py-2 rounded transition-all duration-200 cursor-pointer ml-5"
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
