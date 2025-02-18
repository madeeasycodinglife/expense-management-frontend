import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import expenseService from "../../services/expenseService";
import authService from "../../services/authService";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseGraphComponent = () => {
  const { user, userProfile } = useContext(AuthContext);
  const accessToken = user?.accessToken;
  const [companyDomain, setCompanyDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(""); // Category filter
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Expense Amount",
        data: [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  // Debounce state updates for startYear and endYear
  const [debouncedStartYear, setDebouncedStartYear] = useState(startYear);
  const [debouncedEndYear, setDebouncedEndYear] = useState(endYear);

  // Debounce effect to handle user input delay
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedStartYear(startYear);
      setDebouncedEndYear(endYear);
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(handler); // Clear timeout if the user is typing
    };
  }, [startYear, endYear]);

  // Fetch company domain for user
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

  // Fetch data for the chart using expenseService
  const fetchData = async () => {
    if (companyDomain && accessToken) {
      setLoading(true);
      try {
        const filters = {
          startMonth,
          endMonth,
          startYear: debouncedStartYear,
          endYear: debouncedEndYear,
          category,
        };
        console.log("category before sending : ", category);
        const data = await expenseService.getExpenseCategoryBreakdown(
          companyDomain,
          filters,
          accessToken
        );
        console.log("data : ", data);

        // Dynamically calculate the labels and expenses data
        const labels = data.map((item) => `${item.month}-${item.year}`);
        const amounts = data.map((item) => item.totalAmount);

        // Combine labels and amounts into a single array to sort by year
        const combinedData = labels.map((label, index) => ({
          label,
          amount: amounts[index],
        }));

        // Sort the combined data by the year and month in ascending order
        combinedData.sort((a, b) => {
          const [monthA, yearA] = a.label.split("-").map(Number);
          const [monthB, yearB] = b.label.split("-").map(Number);
          if (yearA === yearB) {
            return monthA - monthB;
          }
          return yearA - yearB;
        });

        // After sorting, separate the labels and amounts again
        const sortedLabels = combinedData.map((item) => item.label);
        const sortedAmounts = combinedData.map((item) => item.amount);

        // Set the chart data with sorted labels and amounts
        setChartData({
          labels: sortedLabels,
          datasets: [
            {
              label: "Expense Amount",
              data: sortedAmounts,
              fill: false,
              borderColor: "#0ced2e",
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.log("inside chart graph : ", error);
        toast.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Apply the data fetching when filters change
  useEffect(() => {
    fetchData();
  }, [
    companyDomain,
    category,
    startMonth,
    endMonth,
    debouncedStartYear,
    debouncedEndYear,
    accessToken,
  ]);

  // Clear all filters
  const clearFilters = () => {
    setCategory("");
    setStartMonth("");
    setEndMonth("");
    setStartYear("");
    setEndYear("");
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            family: "'Arial', sans-serif",
            size: 14,
            weight: "bold",
          },
          color: "#0ced2e",
        },
      },
      tooltip: {
        callbacks: {
          title: (tooltipItem) => {
            return `Month: ${tooltipItem[0].label}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: "'Arial', sans-serif",
            size: 14,
            weight: "bold",
          },
          color: "#c3ed09", // Tick label color
        },
        title: {
          display: true,
          text: "Month-Year",
          font: {
            size: 16,
            weight: "bold",
          },
          color: "#0ced2e", // Title color
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Light white grid lines
          lineWidth: 1, // Grid line width
        },
      },
      y: {
        ticks: {
          font: {
            family: "'Arial', sans-serif",
            size: 14,
            weight: "bold",
          },
          color: "#c3ed09", // Tick label color
          callback: (value) => `$${value}`,
        },
        title: {
          display: true,
          text: "Expense Amount",
          font: {
            size: 16,
            weight: "bold",
          },
          color: "#0ced2e", // Title color
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Light white grid lines
          lineWidth: 1, // Grid line width
        },
      },
    },
  };

  return (
    <div className="shadow-amber-200 min-h-[70vh]">
      <div className="max-w-full mx-auto bg-gradient-to-r p-8 rounded-lg shadow-xl from-[#341d8f] via-[#117d66] to-[#661557] min-w-[72vw] mt-[-3rem] min-h-screen">
        <div className="flex justify-between mb-6 text-fuchsia-400">
          <div className="flex space-x-4">
            {/* Category Filter */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="">Select Category</option>
              <option value="FOOD">Food</option>
              <option value="TRAVEL">Travel</option>
              <option value="OFFICE_SUPPLIES">Office Supplies</option>
            </select>

            {/* Month and Year Filters */}
            <select
              value={startMonth}
              onChange={(e) => setStartMonth(e.target.value)}
              className="px-4 py-2 border rounded-md"
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

            <span className="flex items-center">to</span>
            <select
              value={endMonth}
              onChange={(e) => setEndMonth(e.target.value)}
              className="px-4 py-2 border rounded-md"
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

            <input
              type="number"
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
              placeholder="Start Year"
              className="px-3 py-2 border rounded-md"
            />
            <span className="flex items-center">to</span>
            <input
              type="number"
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
              placeholder="End Year"
              className="px-3 py-2 border rounded-md"
            />

            {/* Clear Filters Button */}
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#c52c2c] text-white rounded-md hover:bg-gradient-to-r hover:from-[#ef4444] hover:via-[#b91c1c] hover:to-[#f87171] hover:cursor-pointer ml-2"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Graph Area */}
        <div className="ml-[-1.8rem] min-w-[72vw] max-h-[62vh] min-h-[62vh]">
          {loading ? (
            <div className="flex justify-center mt-44 items-center text-xl text-[#10cfe0]">
              Loading Chart Data...
            </div>
          ) : (
            <Line data={chartData} options={chartOptions} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseGraphComponent;
