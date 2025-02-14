import React, { useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext
import companyService from "../../services/companyService";
import { ClipLoader } from "react-spinners";

const CreateCompanyComponent = () => {
  const { user } = useContext(AuthContext); // Get user (and accessToken) from AuthContext
  const accessToken = user?.accessToken; // Retrieve accessToken from user context

  const [company, setCompany] = useState({
    name: "",
    domain: "",
    autoApproveThreshold: "",
    emailId: "", // Email field is now first in state
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for handling errors

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  // Validate fields before submitting
  const validateFields = () => {
    if (
      !company.name ||
      !company.domain ||
      !company.autoApproveThreshold ||
      !company.emailId
    ) {
      toast.error("All fields are required!");
      return false;
    }
    if (parseFloat(company.autoApproveThreshold) <= 0) {
      toast.error("Auto-approve threshold must be greater than 0");
      return false;
    }
    // Simple email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(company.emailId)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    setLoading(true);
    setError(null);

    try {
      // Pass the accessToken along with company data
      const response = await companyService.registerCompany(
        company,
        accessToken
      );
      toast.success("Company registered successfully!");
      console.log("Company registered:", response);
      handleCancel(); // Reset form after successful registration
    } catch (error) {
      setError(error);
      toast.error(error || "Company registration failed.");
    } finally {
      setLoading(false);
    }
  };

  // Reset form fields
  const handleCancel = () => {
    setCompany({
      name: "",
      domain: "",
      autoApproveThreshold: "",
      emailId: "", // Reset emailId
    });
    setError(null);
  };

  return (
    <div className="shadow-amber-200 min-h-[70vh]">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-gradient-to-r from-[#341d8f] via-[#117d66] to-[#661557]  p-8 rounded-lg shadow-xl min-w-[71vw]  min-h-screen mt-[-2rem] text-[16px]"
      >
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#c88106] to-[#d29b9b66] mb-6 text-center shadow-amber-50 ml-5">
          Register New Company
        </h2>
        <div className="mt-18">
          {/* Email ID */}
          <div className="mb-6 flex items-center">
            <label
              htmlFor="emailId"
              className="text-white mr-4 w-40 text-right"
            >
              Admin Email ID:
            </label>
            <input
              type="email"
              id="emailId"
              name="emailId"
              value={company.emailId}
              onChange={handleChange}
              placeholder="Enter Admin email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  text-[#13ec8b]"
              required
            />
          </div>

          {/* Company Name */}
          <div className="mb-6 flex items-center">
            <label htmlFor="name" className="text-white mr-4 w-40 text-right">
              Company Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={company.name}
              onChange={handleChange}
              placeholder="Enter company name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  text-[#13ec8b]"
              required
            />
          </div>

          {/* Company Domain */}
          <div className="mb-6 flex items-center">
            <label htmlFor="domain" className="text-white mr-4 w-40 text-right">
              Company Domain:
            </label>
            <input
              type="text"
              id="domain"
              name="domain"
              value={company.domain}
              onChange={handleChange}
              placeholder="Enter company domain"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  text-[#13ec8b]"
              required
            />
          </div>

          {/* Auto-approve Threshold */}
          <div className="mb-6 flex items-center">
            <label
              htmlFor="autoApproveThreshold"
              className="text-white mr-3 w-40 text-right text-nowrap"
            >
              Approve Threshold:
            </label>
            <input
              type="number"
              id="autoApproveThreshold"
              name="autoApproveThreshold"
              value={company.autoApproveThreshold}
              onChange={handleChange}
              placeholder="Enter auto-approve threshold"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  text-[#13ec8b]"
              required
            />
          </div>

          {/* Error message */}
          {error && (
            <p className="text-center text-red-500 font-bold text-xl mt-2 mb-2">
              {JSON.stringify(error)}
            </p>
          )}

          <div className="text-right">
            {/* Cancel Button */}
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-2 px-6 rounded-lg focus:outline-none transition duration-300 hover:from-gray-700 hover:to-gray-800 cursor-pointer mr-4"
            >
              Cancel
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-gradient-to-r from-[#341d8f] via-[#117d66] to-[#661557] text-white py-2 px-6 rounded-lg focus:outline-none transition duration-300 hover:from-[#266080] hover:to-[#34a1b2] cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <ClipLoader size={24} color={"#fff"} />
                  <span className="ml-2">Registering...</span>
                </div>
              ) : (
                "Register Company"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCompanyComponent;
