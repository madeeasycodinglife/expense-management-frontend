import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import authService from "../../services/authService";
import approvalService from "../../services/approvalService";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners"; // Importing the spinner component

const ExpenseListComponent = () => {
  const { user, userProfile } = useContext(AuthContext);
  const accessToken = user?.accessToken;
  const [approvals, setApprovals] = useState([]);
  const [filteredApprovals, setFilteredApprovals] = useState([]);
  const [companyDomain, setCompanyDomain] = useState("");
  const [loading, setLoading] = useState(true); // State to track loading status

  // Filter states
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchCompanyDomain = async () => {
      if (user && accessToken) {
        try {
          const userResponse = await authService.getUser(
            userProfile.email,
            accessToken
          );
          setCompanyDomain(userResponse.companyDomain || "");
        } catch (error) {
          toast.error("Error fetching user data.");
        }
      }
    };

    fetchCompanyDomain();
  }, [user, userProfile]);

  useEffect(() => {
    const fetchApprovals = async () => {
      if (companyDomain && accessToken) {
        setLoading(true); // Set loading to true when starting to fetch approvals
        try {
          const approvalData = await approvalService.getApprovals(
            companyDomain,
            {}, // No filters are sent initially
            accessToken
          );
          setApprovals(approvalData);
          setFilteredApprovals(approvalData); // Initially show all data
        } catch (error) {
          toast.error("Error fetching approvals.");
        } finally {
          setLoading(false); // Set loading to false once data is fetched
        }
      }
    };

    fetchApprovals();
  }, [companyDomain, accessToken]);

  // Filter function to filter the approvals data based on selected filters
  const handleFilter = () => {
    let filteredData = approvals;

    // Filter by month range
    if (startMonth && endMonth) {
      filteredData = filteredData.filter((approval) => {
        const expenseMonth = new Date(approval.expenseDate).getMonth() + 1;
        return (
          expenseMonth >= parseInt(startMonth) &&
          expenseMonth <= parseInt(endMonth)
        );
      });
    }

    // Filter by year range
    if (startYear && endYear) {
      filteredData = filteredData.filter((approval) => {
        const expenseYear = new Date(approval.expenseDate).getFullYear();
        return (
          expenseYear >= parseInt(startYear) && expenseYear <= parseInt(endYear)
        );
      });
    }

    // Filter by status
    if (status) {
      filteredData = filteredData.filter(
        (approval) => approval.status === status
      );
    }

    setFilteredApprovals(filteredData); // Update the filtered data
  };

  // Handle filter changes
  useEffect(() => {
    handleFilter();
  }, [startMonth, endMonth, startYear, endYear, status]);

  // Clear all filters
  const clearFilters = () => {
    setStartMonth("");
    setEndMonth("");
    setStartYear("");
    setEndYear("");
    setStatus("");
    setFilteredApprovals(approvals); // Show all approvals again
  };

  return (
    <div className="shadow-amber-200 min-h-[70vh]">
      {/* <div className="max-w-full mx-auto bg-gradient-to-r p-8 rounded-lg shadow-xl from-[#7d2985] to-[#bd2ad6] min-w-[72vw] mt-[-3rem] min-h-screen"> */}
      <div className="max-w-full mx-auto bg-gradient-to-r p-8 rounded-lg shadow-xl from-[#341d8f] via-[#117d66] to-[#661557] min-w-[72vw] mt-[-3rem] min-h-screen">
        {/* Filters Row */}
        <div className="flex justify-between mb-6 text-fuchsia-400">
          <div className="flex space-x-4">
            {/* Month Range Filter */}
            <select
              value={startMonth}
              onChange={(e) => setStartMonth(e.target.value)}
              className="hover:cursor-pointer px-4 py-2 border rounded-md"
            >
              <option value="">Start Month</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            <span className="flex items-center">to</span>{" "}
            {/* Center the "to" vertically and horizontally */}
            <select
              value={endMonth}
              onChange={(e) => setEndMonth(e.target.value)}
              className="px-4 py-2 border hover:cursor-pointer rounded-md"
            >
              <option value="">End Month</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            {/* Year Range Filter */}
            <input
              type="number"
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
              placeholder="Start Year"
              className="px-3 py-2 border rounded-md"
            />
            <span className="flex items-center">to</span>{" "}
            {/* Center the "to" vertically and horizontally */}
            <input
              type="number"
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
              placeholder="End Year"
              className="px-3 py-2 border rounded-md"
            />
            {/* Status Filter */}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-2 hover:cursor-pointer border rounded-md"
            >
              <option value="">Select Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>{" "}
              {/* Added Rejected option */}
            </select>
            {/* Clear Filters Button */}
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#c52c2c] text-white rounded-md hover:bg-gradient-to-r hover:from-[#ef4444] hover:via-[#b91c1c] hover:to-[#f87171] hover:cursor-pointer ml-2 min-w-24"
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div
          style={{ overflowY: "auto" }}
          className="ml-[-1.8rem] min-w-[72vw] max-h-[63vh]"
        >
          <table className="w-full text-[10.8px]">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gradient-to-r from-[#1d8f61] via-[#aa1adf] to-[#ae0f3c] text-white">
                <th className="px-4 py-2">Expense Id</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Approver Role</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Approved By</th>
                <th className="px-4 py-2">Expense Date</th>
                <th className="px-4 py-2">Approval Initiation Date</th>
                <th className="px-4 py-2">Approval Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" className="text-center py-16">
                    <div className="flex justify-center items-center flex-col">
                      <ClipLoader color="#10cfe0" size={50} />
                      <p className="text-xl text-[#10cfe0] mt-4">
                        Loading Approvals...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredApprovals.map((approval, index) => (
                  <tr
                    key={index}
                    className={`text-center hover:cursor-pointer ${
                      index % 2 === 0
                        ? "bg-gray-200 text-[#c123ed] font-semibold"
                        : "bg-gray-300 text-[#3b23ed] font-semibold"
                    } 
                    hover:bg-[#d5d5d5]`} // Hover effect added here
                  >
                    <td className="px-4 py-2">{approval.expenseId}</td>
                    <td className="px-4 py-2">{approval.title}</td>
                    <td className="px-4 py-2">{approval.description}</td>
                    <td className="px-4 py-2">{approval.category}</td>
                    <td className="px-4 py-2">${approval.amount}</td>
                    <td className="px-4 py-2">{approval.approverRole}</td>
                    <td
                      className={`px-4 py-2 ${
                        approval.status === "PENDING"
                          ? "text-yellow-500 font-bold"
                          : approval.status === "REJECTED"
                          ? "text-red-500 font-bold"
                          : approval.status === "APPROVED"
                          ? "text-green-500 font-bold"
                          : ""
                      }`}
                    >
                      {approval.status}
                    </td>
                    <td className="px-4 py-2">{approval.approvedBy}</td>
                    <td className="px-4 py-2">
                      {new Date(approval.expenseDate).toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(
                        approval.approvalInitiationDate
                      ).toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      {approval.approvalCompletionDate
                        ? new Date(
                            approval.approvalCompletionDate
                          ).toLocaleString()
                        : "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseListComponent;
