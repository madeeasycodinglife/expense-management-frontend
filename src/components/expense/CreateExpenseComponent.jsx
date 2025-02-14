import React, { useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext
import expenseService from "../../services/expenseService"; // Import expenseService
import { ClipLoader } from "react-spinners";

const CreateExpenseComponent = () => {
  const { user } = useContext(AuthContext); // Get user (and accessToken) from AuthContext
  const accessToken = user?.accessToken; // Retrieve accessToken from user context

  const [expense, setExpense] = useState({
    title: "",
    description: "",
    amount: "",
    category: "",
    expenseDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for handling errors

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  // Validate fields before submitting
  const validateFields = () => {
    if (
      !expense.title ||
      !expense.description ||
      !expense.amount ||
      !expense.category ||
      !expense.expenseDate
    ) {
      toast.error("All fields are required!");
      return false;
    }
    if (parseFloat(expense.amount) <= 0) {
      toast.error("Amount must be greater than 0");
      return false;
    }
    if (new Date(expense.expenseDate) > new Date()) {
      toast.error("Expense date cannot be in the future");
      return false;
    }
    return true;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    setLoading(true);
    setError(null); // Reset error on each submit

    try {
      // Pass the accessToken along with expense data
      const response = await expenseService.submitExpense(expense, accessToken);
      if (
        response.status == "SERVICE_UNAVAILABLE" ||
        response.status == "503 SERVICE_UNAVAILABLE"
      ) {
        toast.error("Sorry Service is not Available .");
        return;
      }
      toast.success("Expense created successfully!");
      console.log("Expense created:", response);
      handleCancel(); // Reset form after successful submission
    } catch (error) {
      setError(error);
      toast.error(JSON.stringify(error) || "Expense creation failed.");
    } finally {
      setLoading(false);
    }
  };

  // Handler to reset form fields to default values
  const handleCancel = () => {
    setExpense({
      title: "",
      description: "",
      amount: "",
      category: "",
      expenseDate: "",
    });
    setError(null); // Reset error state
  };

  return (
    <div className="shadow-amber-200 min-h-[70vh]">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto  p-8 rounded-lg shadow-xl bg-gradient-to-r from-[#341d8f] via-[#117d66] to-[#661557] min-w-[71vw] mt-[-3rem] min-h-screen"
      >
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#f03333] to-[#e2068add] mb-6 text-center shadow-amber-50 ml-5">
          Add New Expense
        </h2>

        {/* Title */}
        <div className="mb-6 flex items-center">
          <label htmlFor="title" className="text-white mr-4 w-40 text-right">
            Title :
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={expense.title}
            onChange={handleChange}
            placeholder="Enter Title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  text-[#13ec8b]"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6 flex items-center">
          <label
            htmlFor="description"
            className="text-white mr-4 w-40 text-right"
          >
            Description :
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={expense.description}
            onChange={handleChange}
            placeholder="Enter Description"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  text-[#13ec8b]"
            required
          />
        </div>

        {/* Amount */}
        <div className="mb-6 flex items-center">
          <label htmlFor="amount" className="text-white mr-4 w-40 text-right">
            Amount :
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={expense.amount}
            onChange={handleChange}
            placeholder="Enter Amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  text-[#13ec8b]"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-6 flex items-center">
          <label htmlFor="category" className="text-white mr-4 w-40 text-right">
            Category :
          </label>
          <select
            id="category"
            name="category"
            value={expense.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  text-[#13ec8b]"
            required
          >
            <option value="">Select Category</option>
            <option value="FOOD" className=" text-black">
              Food
            </option>
            <option value="TRAVEL" className=" text-black">
              Travel
            </option>
            <option value="OFFICE_SUPPLIES" className=" text-black">
              OFFICE SUPPLIES
            </option>
          </select>
        </div>

        {/* Expense Date */}
        <div className="mb-6 flex items-center">
          <label
            htmlFor="expenseDate"
            className="text-white mr-4 w-40 text-right"
          >
            Expense Date :
          </label>
          <input
            type="datetime-local"
            id="expenseDate"
            name="expenseDate"
            value={expense.expenseDate}
            onChange={handleChange}
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

          {/* Add Expense Button */}
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
              "Add Expense"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateExpenseComponent;
