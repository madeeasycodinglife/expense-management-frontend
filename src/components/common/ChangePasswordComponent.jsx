import React, { useContext, useEffect, useState } from "react";
import authService from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

const ChangePasswordComponent = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser, userProfile, setUserProfile, updateUserProfile } =
    useContext(AuthContext);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyDomain, setCompanyDomain] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.accessToken) {
        try {
          const userResponse = await authService.getUser(
            userProfile.email,
            user.accessToken
          );

          setFullName(userResponse.fullName || "");
          setEmail(userResponse.email || "");
          setPhoneNumber(userResponse.phone || "");
          setCompanyDomain(userResponse.companyDomain || "");
          setRole(userResponse.role || "");
        } catch (error) {
          toast.error("Error fetching user data.");
        }
      }
    };

    fetchUserData();
  }, [user, userProfile]);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!newPassword || !confirmNewPassword) {
      setError("Both fields are required.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    try {
      setIsLoading(true); // Start loading
      const updateData = {
        email: userProfile.email,
        companyDomain: companyDomain,
        password: confirmNewPassword,
      };
      const userResponse = await updateUserProfile(
        userProfile.email,
        updateData,
        user.accessToken
      );
      console.log("after password updaing : ", userResponse);
      // Reset form fields
      setNewPassword("");
      setConfirmNewPassword("");
      setError("");
      toast.success("Passsword Updated Successfully !!");
    } catch (error) {
      console.error("Error updating user profile:", error);
      const errorMessage = error.response.data.message;
      toast.error(errorMessage);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="shadow-amber-200 min-h-[70vh]">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-gradient-to-r  p-8 rounded-lg shadow-xl min-w-[71vw] min-h-screen mt-[-2rem] text-2xl"
      >
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#c88106] to-[#d29b9b66] mb-6 text-center shadow-amber-50 ml-5 text-nowrap">
          Change Password
        </h2>

        {/* New Password */}
        <div className="mb-6 grid grid-cols-4 items-center gap-4">
          <label
            htmlFor="newPassword"
            className="text-white text-right whitespace-nowrap col-span-1 "
          >
            New Password :
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder="New Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#13ec8b] col-span-3"
            required
          />
        </div>

        {/* Confirm New Password */}
        <div className="mb-6 grid grid-cols-4 items-center gap-5">
          <label
            htmlFor="confirmNewPassword"
            className="text-white text-right whitespace-nowrap col-span-1 "
          >
            Confirm Password :
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={handleConfirmNewPasswordChange}
            placeholder="Confirm New Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#13ec8b] col-span-3"
            required
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 text-center text-red-500 font-bold text-xl">
            {error}
          </div>
        )}

        <div className="text-right">
          {/* Cancel Button */}
          <button
            type="button"
            onClick={() => {
              setNewPassword("");
              setConfirmNewPassword("");
              setError("");
            }}
            className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-2 px-6 rounded-lg focus:outline-none transition duration-300 hover:from-gray-700 hover:to-gray-800 cursor-pointer mr-4"
          >
            Cancel
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 px-6 rounded-lg focus:outline-none transition duration-300 hover:from-green-700 hover:to-teal-700 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="loader mr-2 border-t-4 border-white border-solid rounded-full w-5 h-5 animate-spin"></div>
                <span>Changing...</span>
              </div>
            ) : (
              "Change Password"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordComponent;
