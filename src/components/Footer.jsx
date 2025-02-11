import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa"; // Importing specific icons from React Icons

import expense from "../assets/expense-logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-500 to-pink-400 text-white py-6 shadow-lg mt-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Logo and Copyright */}
        <div className="flex items-center space-x-4">
          <img src={expense} alt="Expense Tracker Logo" className="h-8" />
          <p className="text-lg font-semibold">
            © 2025 Expense Tracker. All rights reserved.
          </p>
        </div>

        {/* Footer Links */}
        <div className="hidden md:flex space-x-8">
          <a
            href="#about"
            className="text-lg font-medium hover:text-gray-200 transition-all duration-300"
          >
            About
          </a>
          <a
            href="#privacy"
            className="text-lg font-medium hover:text-gray-200 transition-all duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="#contact"
            className="text-lg font-medium hover:text-gray-200 transition-all duration-300"
          >
            Contact
          </a>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="#"
            className="hover:scale-110 transform transition-all duration-300"
          >
            <FaFacebook size={24} className="text-white hover:text-gray-300" />
          </a>
          <a
            href="#"
            className="hover:scale-110 transform transition-all duration-300"
          >
            <FaTwitter size={24} className="text-white hover:text-gray-300" />
          </a>
          <a
            href="#"
            className="hover:scale-110 transform transition-all duration-300"
          >
            <FaLinkedin size={24} className="text-white hover:text-gray-300" />
          </a>
          {/* YouTube Icon */}
          <a
            href="#"
            className="hover:scale-110 transform transition-all duration-300"
          >
            <FaYoutube size={24} className="text-white hover:text-gray-300" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
