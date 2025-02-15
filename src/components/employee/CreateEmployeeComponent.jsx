import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { ClipLoader } from "react-spinners";

const CreateEmployeeComponent = () => {
  const [employee, setEmployee] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    companyDomain: "",
    password: "", // Add password field
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for handling errors

  const { user, newEmployee } = useContext(AuthContext);
  // Password validation regex (same as backend pattern)
  const PASSWORD_PATTERN =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  // Validate fields before submitting
  const validateFields = () => {
    if (
      !employee.fullName ||
      !employee.email ||
      !employee.phone ||
      !employee.role ||
      !employee.companyDomain ||
      !employee.password
    ) {
      toast.error("All fields are required!");
      return false;
    }

    // Simple email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(employee.email)) {
      toast.error("Please provide a valid email address.");
      return false;
    }

    // Simple phone number validation
    const phonePattern = /^[+]?[0-9]{10,13}$/;
    if (!phonePattern.test(employee.phone)) {
      toast.error("Please provide a valid phone number.");
      return false;
    }

    // Password validation using backend regex
    if (!PASSWORD_PATTERN.test(employee.password)) {
      toast.error(
        "Password must be at least 8 characters long and include a mix of uppercase, lowercase, numbers, and special characters."
      );
      return false;
    }

    return true;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      setLoading(true);
      try {
        await newEmployee(employee, user.accessToken);

        toast.success("Registration Successful !!"); // ✅ Show success toast

        setEmployee({
          fullName: "",
          email: "",
          phone: "",
          role: "",
          companyDomain: "",
          password: "",
        });
      } catch (err) {
        console.log(err);
        setError(err.message || "Registration failed");
        toast.error("Registration failed! Try again."); // ❌ Show error toast
      }
      setLoading(false);
    }
  };

  // Handler to reset form fields to default values
  const handleCancel = () => {
    setEmployee({
      fullName: "",
      email: "",
      phone: "",
      role: "",
      companyDomain: "",
      password: "",
    });
  };

  return (
    <div className="shadow-amber-200 min-h-[70vh]">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-gradient-to-r from-[#341d8f] via-[#117d66] to-[#661557] p-8 rounded-lg shadow-xl min-w-[71vw] mt-[-2rem]"
      >
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#c88106] to-[#d29b9b66] mb-6 text-center shadow-amber-50 ml-5">
          Add New Employee
        </h2>
        {/* Full Name */}
        <div className="mb-4 flex items-center">
          <label htmlFor="fullName" className="text-white mr-4 w-40 text-right">
            Name :
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={employee.fullName}
            onChange={handleChange}
            placeholder="Enter Full Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  text-[#13ec8b]"
            required
          />
        </div>
        {/* Email */}
        <div className="mb-6 flex items-center">
          <label htmlFor="email" className="text-white mr-4 w-40 text-right">
            Email :
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            placeholder="Enter Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  text-[#13ec8b]"
            required
          />
        </div>
        {/* Phone Number */}
        <div className="mb-6 flex items-center">
          <label htmlFor="phone" className="text-white mr-4 w-40 text-right">
            Phone :
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={employee.phone}
            onChange={handleChange}
            placeholder="Enter Phone Number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  text-[#13ec8b]"
            required
          />
        </div>
        {/* Role */}
        <div className="mb-6 flex items-center">
          <label htmlFor="role" className="text-white mr-4 w-40 text-right">
            Role :
          </label>
          <select
            id="role"
            name="role"
            value={employee.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#0bf066]"
            required
          >
            <option value="" className="text-black">
              Select Role
            </option>
            <option value="FINANCE" className="text-black">
              Finance
            </option>
            <option value="MANAGER" className="text-black">
              Manager
            </option>
            <option value="EMPLOYEE" className="text-black">
              Employee
            </option>
          </select>
        </div>
        {/* Company Domain */}
        <div className="mb-6 flex items-center">
          <label
            htmlFor="companyDomain"
            className="text-white mr-4 w-40 text-right"
          >
            Domain :
          </label>
          <input
            type="text"
            id="companyDomain"
            name="companyDomain"
            value={employee.companyDomain}
            onChange={handleChange}
            placeholder="Enter Company Domain"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  text-[#13ec8b]"
            required
          />
        </div>
        {/* Password */}
        <div className="mb-6 flex items-center">
          <label htmlFor="password" className="text-white mr-4 w-40 text-right">
            Password :
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={employee.password}
            onChange={handleChange}
            placeholder="Enter Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  text-[#13ec8b]"
            required
          />
        </div>
        {/* Error message */}
        {/* {error && (
          <p className="text-center text-red-500 font-bold text-xl mt-2 mb-2">
            {error}
          </p> */}
        {/* )} */}
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
                <span className="ml-2">Submitting...</span>
              </div>
            ) : (
              "Add Employee"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEmployeeComponent;
