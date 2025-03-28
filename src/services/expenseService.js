import axios from "axios";

const API_URL = "http://localhost:8080/expense-service/";

// Axios instance with timeout configuration
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 50000, // Timeout set to 10 seconds for all requests
});

// Error handling function to manage different types of errors
const handleError = (error) => {
  console.log("inside handleError :", error);
  if (error.response) {
    switch (error.response.status) {
      case 404:
        return error.response.data
          ? error.response.data
          : "The resource you're looking for was not found.";
      case 500:
        return "Server error, please try again later.";
      default:
        return error.response?.data?.message || "Something went wrong.";
    }
  } else if (error.request) {
    return "Network error, please check your connection.";
  } else {
    return "An unexpected error occurred.";
  }
};

const expenseService = {
  /**
   * Submits a new expense.
   * @param {Object} expenseData - The expense details.
   * @param {string} accessToken - The access token for authorization.
   * @returns {Promise<Object>} - The response from the expense submission.
   */
  submitExpense: async (expenseData, accessToken) => {
    try {
      console.time("submittingExpense");
      console.log("Submitting expense:", expenseData);

      const response = await axiosInstance.post(
        `${API_URL}submit`,
        expenseData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.timeEnd("submitedExpense");
      console.log("Response after submitting:", response);
      return response;
    } catch (error) {
      console.error("Expense submission error:", error);
      throw error;
    }
  },

  /**
   * Fetches expense details by ID.
   * @param {number} expenseId - The ID of the expense.
   * @param {string} accessToken - The access token for authorization.
   * @returns {Promise<Object>} - The expense details.
   */
  getExpenseById: async (expenseId, accessToken) => {
    try {
      console.log("Fetching expense details for ID:", expenseId);

      const response = await axiosInstance.get(`${API_URL}get/${expenseId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      const errorMessage = handleError(error);
      console.error("Error fetching expense details:", errorMessage);
      throw errorMessage;
    }
  },

  /**
   * Fetches all expenses.
   * @param {string} accessToken - The access token for authorization.
   * @returns {Promise<Array>} - The list of all expenses.
   */
  getAllExpenses: async (accessToken) => {
    try {
      console.log("Fetching all expenses");

      const response = await axiosInstance.get(`${API_URL}get-all-expenses`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      const errorMessage = handleError(error);
      console.error("Error fetching all expenses:", errorMessage);
      throw errorMessage;
    }
  },

  /**
   * Deletes an expense by its ID.
   * @param {number} expenseId - The ID of the expense to delete.
   * @param {string} accessToken - The access token for authorization.
   * @returns {Promise<void>} - The response after deleting the expense.
   */
  deleteExpense: async (expenseId, accessToken) => {
    try {
      console.log("Deleting expense with ID:", expenseId);

      await axiosInstance.delete(`${API_URL}delete/${expenseId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("Expense deleted successfully");
    } catch (error) {
      const errorMessage = handleError(error);
      console.error("Error deleting expense:", errorMessage);
      throw errorMessage;
    }
  },

  /**
   * Partially updates an expense.
   * @param {number} expenseId - The ID of the expense to update.
   * @param {Object} expensePartialData - The partial expense data.
   * @param {string} accessToken - The access token for authorization.
   * @returns {Promise<Object>} - The updated expense data.
   */
  updateExpense: async (expenseId, expensePartialData, accessToken) => {
    try {
      console.log("Updating expense with ID:", expenseId);

      const response = await axiosInstance.patch(
        `${API_URL}update/${expenseId}`,
        expensePartialData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const errorMessage = handleError(error);
      console.error("Error updating expense:", errorMessage);
      throw errorMessage;
    }
  },

  /**
   * Generates an expense invoice PDF.
   * @param {string} domainName - The company's domain name.
   * @param {Object} filters - Filters for generating the invoice (optional).
   * @param {string} accessToken - The access token for authorization.
   * @returns {Promise<Blob>} - The PDF file as a Blob.
   */
  generateExpenseInvoice: async (domainName, filters = {}, accessToken) => {
    try {
      console.log(
        "Generating invoice for domain:",
        domainName,
        "with filters:",
        filters
      );

      const { startYear, endYear, startMonth, endMonth, category } = filters;

      const response = await axiosInstance.get(
        `${API_URL}generate/invoice/${domainName}`,
        {
          params: { startYear, endYear, startMonth, endMonth, category },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          responseType: "blob", // Set response type to blob for PDF download
        }
      );

      console.log("Response received:", response);
      return response;
    } catch (error) {
      const errorMessage = handleError(error);
      console.error("Error generating expense invoice:", errorMessage);
      throw errorMessage;
    }
  },
  /**
   * Fetches monthly expense trends.
   * @param {string} companyDomain - The domain of the company.
   * @param {Object} filters - Optional filters for year and month.
   * @param {string} accessToken - The access token for authorization.
   * @returns {Promise<Array>} - The list of monthly expense trends.
   */ getMonthlyExpenseTrends: async (companyDomain, filters, accessToken) => {
    try {
      console.log(
        "Fetching monthly expense trends for domain:",
        companyDomain,
        "with filters:",
        filters
      );

      const { startYear, endYear, startMonth, endMonth } = filters;

      const response = await axiosInstance.get(
        `${API_URL}monthly-trends/${companyDomain}`,
        {
          params: { startYear, endYear, startMonth, endMonth },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("inside getMontlyExpenseTreds : ", response);
      return response.data;
    } catch (error) {
      const errorMessage = handleError(error);
      console.error("Error fetching monthly expense trends:", errorMessage);
      throw errorMessage;
    }
  },

  /**
   * Fetches yearly expense trends.
   * @param {string} companyDomain - The domain of the company.
   * @param {Object} filters - Optional filters for the year.
   * @param {string} accessToken - The access token for authorization.
   * @returns {Promise<Array>} - The list of yearly expense trends.
   */
  getYearlyExpenseTrends: async (companyDomain, filters, accessToken) => {
    try {
      console.log(
        "Fetching yearly expense trends for domain:",
        companyDomain,
        "with filters:",
        filters
      );

      const { startYear, endYear } = filters;

      const response = await axiosInstance.get(
        `${API_URL}yearly-trends/${companyDomain}`,
        {
          params: { startYear, endYear },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const errorMessage = handleError(error);
      console.error("Error fetching yearly expense trends:", errorMessage);
      throw errorMessage;
    }
  },

  /**
   * Fetches expense breakdown by category.
   * @param {string} companyDomain - The domain of the company.
   * @param {Object} filters - Optional filters for year, month, and category.
   * @param {string} accessToken - The access token for authorization.
   * @returns {Promise<Array>} - The list of expense category breakdown.
   */
  getExpenseCategoryBreakdown: async (companyDomain, filters, accessToken) => {
    try {
      console.log(
        "Fetching expense category breakdown for domain:",
        companyDomain,
        "with filters:",
        filters
      );

      const { startYear, endYear, startMonth, endMonth, category } = filters;

      // Prepare query parameters, only add them if they have values
      const params = {};
      if (startYear) params.startYear = startYear;
      if (endYear) params.endYear = endYear;
      if (startMonth) params.startMonth = startMonth;
      if (endMonth) params.endMonth = endMonth;
      if (category) params.category = category;

      const response = await axiosInstance.get(
        `${API_URL}category-breakdown/${companyDomain}`,
        {
          params,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("category response : ", response);

      return response.data;
    } catch (error) {
      const errorMessage = handleError(error);
      console.error("Error fetching expense category breakdown:", errorMessage);
      throw errorMessage;
    }
  },
};

export default expenseService;
