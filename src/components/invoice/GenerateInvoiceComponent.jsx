import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios"; // Import axios to make the API request
import expenseService from "../../services/expenseService";
import { AuthContext } from "../../context/AuthContext";
import authService from "../../services/authService";
import { ClipLoader } from "react-spinners";
const GenerateInvoiceComponent = () => {
  const [filters, setFilters] = useState({
    domainName: "",
    startYear: "",
    endYear: "",
    startMonth: "",
    endMonth: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user, userProfile } = useContext(AuthContext); // Get user (and accessToken) from AuthContext
  const accessToken = user?.accessToken; // Retrieve accessToken from user context
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authService.getUser(
          userProfile.email,
          user.accessToken
        );
        console.log("rendered invoice : ", response);
        setUserData(response); // Store the response in state
      } catch (error) {
        setError("Failed to fetch user data");
        toast.error("Error fetching data");
      }
    };

    fetchData();
  }, [userProfile.email, user.accessToken]); // Add dependencies so the effect runs again if the email or accessToken changes

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Validate fields before submitting
  const validateFields = () => {
    if (
      filters.startYear &&
      filters.endYear &&
      filters.startYear > filters.endYear
    ) {
      toast.error("Start Year cannot be greater than End Year");
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
      const params = {
        startYear: filters.startYear || undefined,
        endYear: filters.endYear || undefined,
        startMonth: filters.startMonth || undefined,
        endMonth: filters.endMonth || undefined,
        category: filters.category || undefined,
      };

      // Make API request to generate invoice
      const response = await expenseService.generateExpenseInvoice(
        userData.companyDomain,
        filters,
        accessToken
      );
      // Create a blob from the PDF data
      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);

      // Create a link to download the PDF
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = "Expense_Invoice.pdf";
      link.click();

      toast.success("Invoice generated successfully!");
    } catch (error) {
      setError("Failed to generate invoice");
      toast.error("Invoice generation failed.");
    } finally {
      setLoading(false);
    }
  };

  // Handler to reset form fields
  const handleCancel = () => {
    setFilters({
      domainName: "",
      startYear: "",
      endYear: "",
      startMonth: "",
      endMonth: "",
      category: "",
    });
  };

  return (
    <div className="shadow-amber-200 min-h-[70vh]">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-gradient-to-r from-[#341d8f] via-[#117d66] to-[#661557] p-8 rounded-lg shadow-xl min-w-[71vw] mt-[-3rem]"
      >
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#f03333] to-[#e2068add] mb-6 text-center shadow-amber-50 ml-5">
          Generate Expense Invoice
        </h2>

        {/* Domain Name */}
        <div className="mb-6 flex items-center">
          <label
            htmlFor="domainName"
            className="text-white mr-4 w-40 text-right"
          >
            Domain:
          </label>
          <input
            type="text"
            id="domainName"
            name="domainName"
            value={userData?.companyDomain || ""}
            onChange={handleChange}
            placeholder="Enter Domain Name"
            className="w-full px-4 text-[#a713ec] py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 cursor-not-allowed"
            readOnly
            disabled
          />
        </div>

        {/* Start Year */}
        <div className="mb-6 flex items-center">
          <label
            htmlFor="startYear"
            className="text-white mr-4 w-40 text-right"
          >
            Start Year:
          </label>
          <input
            type="number"
            id="startYear"
            name="startYear"
            value={filters.startYear}
            onChange={handleChange}
            placeholder="Enter Start Year"
            className="w-full text-[#13ec8b] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* End Year */}
        <div className="mb-6 flex items-center">
          <label htmlFor="endYear" className="text-white mr-4 w-40 text-right">
            End Year:
          </label>
          <input
            type="number"
            id="endYear"
            name="endYear"
            value={filters.endYear}
            onChange={handleChange}
            placeholder="Enter End Year"
            className="w-full px-4 text-[#13ec8b] py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Start Month */}
        <div className="mb-6 flex items-center">
          <label
            htmlFor="startMonth"
            className="text-white mr-4 w-40 text-right"
          >
            Start Month:
          </label>
          <input
            type="number"
            id="startMonth"
            name="startMonth"
            value={filters.startMonth}
            onChange={handleChange}
            placeholder="Enter Start Month"
            className="w-full px-4 py-2 text-[#13ec8b] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* End Month */}
        <div className="mb-6 flex items-center">
          <label htmlFor="endMonth" className="text-white mr-4 w-40 text-right">
            End Month:
          </label>
          <input
            type="number"
            id="endMonth"
            name="endMonth"
            value={filters.endMonth}
            onChange={handleChange}
            placeholder="Enter End Month"
            className="w-full px-4 py-2 text-[#13ec8b] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div className="mb-6 flex items-center">
          <label htmlFor="category" className="text-white mr-4 w-40 text-right">
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full px-4 py-2 text-[#13ec8b] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            <option value="Food" className="text-black">
              Food
            </option>
            <option value="Travel" className="text-black">
              Travel
            </option>
            <option value="OfficeSupplies" className="text-black">
              Office Supplies
            </option>
          </select>
        </div>

        {/* Error message */}
        {/* {error && (
          <p className="text-center text-red-500 font-bold text-xl mt-2 mb-2">
            {error}
          </p>
        )} */}

        <div className="text-right">
          {/* Cancel Button */}
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-2 px-6 rounded-lg focus:outline-none transition duration-300 hover:from-gray-700 hover:to-gray-800 cursor-pointer mr-4"
          >
            Cancel
          </button>

          {/* Generate Invoice Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-[#341d8f] via-[#117d66] to-[#661557] text-white py-2 px-6 rounded-lg focus:outline-none transition duration-300 hover:from-[#266080] hover:to-[#34a1b2] cursor-pointer"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <ClipLoader size={24} color={"#fff"} />
                <span className="ml-2">Generating...</span>
              </div>
            ) : (
              "Generate Invoice"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GenerateInvoiceComponent;
