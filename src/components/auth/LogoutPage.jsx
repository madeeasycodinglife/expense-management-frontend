import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import logOut from "../../assets/log-out.png"; // Your image

const LogoutPage = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state

  const handleLogout = async () => {
    setLoading(true); // Set loading to true when the user clicks the logout button
    try {
      await logout();
      toast.success("Log Out Sucess !!");
      navigate("/");
    } catch (error) {
      const errorMessage = error.response.data.message;
      console.error("Logout failed", error);
      toast.error(errorMessage + " Logout Failed"); // Show error using Toastify
      setLoading(false); // Set loading to false if an error occurs
    }
  };

  const handleCancel = () => {
    navigate(-1, { replace: true }); // Replace true means the current page is removed from history
  };

  return (
    <div className="shadow-amber-200 bg-gradient-to-r from-[rgb(113,13,88)] to-[rgb(130,54,244)] min-h-[70vh] flex items-center justify-center">
      <div className="max-w-lg mx-auto text-center">
        {/* Image styled as a circle */}
        <img
          src={logOut}
          alt="LogOut Image"
          className="w-24 h-24 rounded-full mx-auto mb-6" // Added classes for circle and margin
        />
        <p className="text-4xl mb-10 text-gradient-shadow">
          Do you want to logout?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-lg text-lg hover:cursor-pointer hover:from-red-600 hover:to-red-700 focus:outline-none mr-9"
            disabled={loading} // Disable the button while loading
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 text-white mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Logging out...
              </div>
            ) : (
              "Logout"
            )}
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-300 text-gray-800 py-3 px-4 rounded-lg text-lg hover:bg-gray-400 focus:outline-none hover:cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
