import React, { useState, useEffect, useContext } from "react";
import authService from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

const EditProfileComponent = () => {
  const { user, userProfile, updateUserProfile } = useContext(AuthContext);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyDomain, setCompanyDomain] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

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

  const validateForm = () => {
    if (!fullName.trim()) {
      return false;
    }
    if (!email.trim()) {
      return false;
    }
    if (!phoneNumber.trim()) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const updateData = {
        fullName,
        email,
        phone: phoneNumber,
        companyDomain,
      };

      await updateUserProfile(userProfile.email, updateData, user.accessToken);

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Update failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reset form fields except non-editable ones
  const handleCancel = () => {
    setFullName("");
    setEmail("");
    setPhoneNumber("");
  };

  return (
    <div className="shadow-amber-200 min-h-[70vh]">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-gradient-to-r from-[#341d8f] via-[#117d66] to-[#661557] p-8 rounded-lg shadow-xl min-w-[71vw] mt-[-3rem] min-h-screen text-[20px]"
      >
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#c88106] to-[#d29b9b66] mb-6 text-center">
          Edit Profile
        </h2>

        {/* Full Name */}
        <div className="mb-6 flex items-center">
          <label className="text-white mr-4 w-40 text-right"> Name :</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter Full Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#13ec8b]"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-6 flex items-center">
          <label className="text-white mr-4 w-40 text-right">Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#13ec8b]"
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-6 flex items-center">
          <label className="text-white mr-4 w-40 text-right">Phone :</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter Phone Number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#13ec8b]"
            required
          />
        </div>

        {/* Company Domain (Not Editable) */}
        <div className="mb-6 flex items-center">
          <label className="text-white mr-4 w-40 text-right text-nowrap">
            Domain :
          </label>
          <input
            type="text"
            value={companyDomain}
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-200 cursor-not-allowed"
          />
        </div>

        {/* Role (Not Editable) */}
        <div className="mb-6 flex items-center">
          <label className="text-white mr-4 w-40 text-right">Role :</label>
          <input
            type="text"
            value={role}
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-200 cursor-not-allowed"
          />
        </div>

        {/* Buttons */}
        <div className="text-right">
          {/* Cancel Button */}
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-2 px-6 rounded-lg focus:outline-none transition duration-300 hover:from-gray-700 hover:to-gray-800 cursor-pointer mr-4"
          >
            Cancel
          </button>

          {/* Save Changes Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-[#341d8f] via-[#117d66] to-[#661557] text-white py-2 px-6 rounded-lg focus:outline-none transition duration-300 hover:from-[#266080] hover:to-[#34a1b2] cursor-pointer"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <ClipLoader size={24} color={"#fff"} />
                <span className="ml-2">Saving</span>
              </div>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileComponent;
