import { Link, useNavigate } from "react-router-dom"; // Use useNavigate for programmatic navigation
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import expenseIllustration from "../assets/expense-illustration.webp";

const Home = () => {
  const { user } = useContext(AuthContext); // Get the user from AuthContext
  const navigate = useNavigate(); // Initialize the navigate function

  const handleGetStartedClick = () => {
    if (user) {
      // If the user is logged in, navigate to the dashboard
      navigate("/dashboard");
    } else {
      // If the user is not logged in, navigate to the login page
      navigate("/login");
    }
  };

  return (
    <section className="bg-gradient-to-br from-[#bd2ad6] to-[#35196a] min-h-[90vh] flex items-center justify-center px-6 md:px-12">
      <div className="container mx-auto flex flex-col pt-28 md:flex-row items-center justify-between">
        {/* Left Side - Text Content */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Take Control of Your{" "}
            <span className="text-yellow-600">Expenses</span>
          </h1>
          <p className="text-xl text-[#07d1ac]">
            Manage your finances effortlessly with our smart expense tracker.
            Get real-time insights, track your spending, and save for the
            future.
          </p>

          {/* Button with custom onClick */}
          <button
            onClick={handleGetStartedClick}
            className="px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 hover:cursor-pointer"
          >
            Get Started
          </button>
        </div>

        {/* Right Side - Illustration/Image */}
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
          <img
            src={expenseIllustration}
            alt="Expense Management Illustration"
            className="max-w-xs md:max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
