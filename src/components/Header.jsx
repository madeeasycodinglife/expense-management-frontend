import { useState, useContext, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import expense from "../assets/expense-logo.png";
import { AuthContext } from "../context/AuthContext"; // Import the AuthContext
import { toast } from "react-hot-toast";

const Header = () => {
  const { user, userProfile, logout } = useContext(AuthContext); // Use context to get user data
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Side effect whenever the user changes
    console.log("User changed:", user);
  }, [user, userProfile]); // This will run whenever the user changes (logs in or out)

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await logout(); // Wait for logout to complete
      console.log("inseide header logout : ", response);
      if (response.status == 200) {
        toast.success("Log Out Success !!");
        navigate("/");
      }
    } catch (error) {
      toast.error("Logout Error."); // Show error message if something goes wrong
      navigate("/");
    }
  };

  return (
    // <header className="bg-gradient-to-r from-pink-400 to-indigo-500 text-white shadow-lg fixed w-full z-50">
    <header className="bg-gradient-to-r from-[#d33b87] via-[#3abaed] to-[#9563f1] text-white shadow-lg fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center">
            <img
              src={expense}
              alt="Expense Tracker Logo"
              className="h-8 mr-4"
            />
            <h1 className="text-2xl font-bold">Expense Tracker</h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {user ? (
            // Show "Hi <name>" and Logout button when user is logged in
            <div className="flex items-center space-x-4">
              <p className="text-lg font-bold">Hi, {userProfile?.fullName}</p>
              <button
                onClick={handleLogout}
                className="px-6 py-3 text-lg font-bold text-white rounded-full border-2 border-transparent hover:bg-indigo-700 hover:border-indigo-500 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </div>
          ) : (
            // Show login and signup buttons when user is not logged in
            <>
              <Link to="/login">
                <p className="px-6 py-3 text-lg font-bold text-white rounded-full border-2 border-transparent hover:bg-indigo-700 hover:border-indigo-500 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-md hover:shadow-lg">
                  Log In
                </p>
              </Link>
              <Link to="/register">
                <p className="px-6 py-3 text-lg font-bold text-white rounded-full border-2 border-transparent hover:bg-indigo-700 hover:border-indigo-500 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-md hover:shadow-lg">
                  Sign Up
                </p>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X size={28} className="cursor-pointer" />
          ) : (
            <Menu size={28} className="cursor-pointer" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-indigo-700 p-4 absolute w-full top-full left-0 shadow-md">
          <ul className="flex flex-col space-y-4 text-center">
            {user ? (
              // Mobile version for "Hi <name>" and Logout
              <>
                <li>
                  <p className="block p-4 text-xl font-bold text-white rounded-full border-2 border-transparent hover:bg-indigo-700 hover:border-indigo-500 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-md hover:shadow-lg">
                    Hi, {userProfile?.fullName}
                  </p>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="block p-4 text-xl font-bold text-white rounded-full border-2 border-transparent hover:bg-indigo-700 hover:border-indigo-500 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-md hover:shadow-lg"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              // Mobile version for Login and Signup
              <>
                <li>
                  <Link to="/login">
                    <p className="block p-4 text-xl font-bold text-white rounded-full border-2 border-transparent hover:bg-indigo-700 hover:border-indigo-500 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-md hover:shadow-lg">
                      Log In
                    </p>
                  </Link>
                </li>
                <li>
                  <Link to="/register">
                    <p className="block p-4 text-xl font-bold text-white rounded-full border-2 border-transparent hover:bg-indigo-700 hover:border-indigo-500 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-md hover:shadow-lg">
                      Sign Up
                    </p>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
