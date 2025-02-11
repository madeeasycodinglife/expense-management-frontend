import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link for navigation
import expense from "../assets/expense-logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-pink-400 to-indigo-500 text-white shadow-lg fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <img src={expense} alt="Expense Tracker Logo" className="h-8 mr-4" />
          <h1 className="text-2xl font-bold">Expense Tracker</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {/* Use Link for navigation */}
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
            <li>
              {/* Use Link for navigation */}
              <Link to="/login">
                <p className="block p-4 text-xl font-bold text-white rounded-full border-2 border-transparent hover:bg-indigo-700 hover:border-indigo-500 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-md hover:shadow-lg">
                  Log In
                </p>
              </Link>
            </li>
            <li>
              {/* Use Link for navigation */}
              <Link to="/register">
                <p className="block p-4 text-xl font-bold text-white rounded-full border-2 border-transparent hover:bg-indigo-700 hover:border-indigo-500 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-md hover:shadow-lg">
                  Sign Up
                </p>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
