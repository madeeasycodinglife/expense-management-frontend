import axios from "axios";

const API_URL = "http://localhost:8080/expense-service/";

const expenseService = {
  /**
   * Submits a new expense.
   * @param {Object} expenseData - The expense details.
   * @param {string} accessToken - The access token for authorization.
   * @returns {Promise<Object>} - The response from the expense submission.
   */
  submitExpense: async (expenseData, accessToken) => {
    try {
      console.log("Submitting expense:", expenseData);

      const response = await axios.post(`${API_URL}submit`, expenseData, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Add the accessToken in the Authorization header
        },
      });
      console.log("response after submitting : ", response);
      return response.data; // Return the response from the server
    } catch (error) {
      console.error("Expense submission error:", error.response?.data || error);
      throw error.response?.data || "Expense submission failed";
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

      const response = await axios.get(`${API_URL}get/${expenseId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Add the accessToken in the Authorization header
        },
      });

      return response.data; // Return the expense details
    } catch (error) {
      console.error(
        "Error fetching expense details:",
        error.response?.data || error
      );
      throw error.response?.data || "Failed to fetch expense details";
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

      const response = await axios.get(`${API_URL}get-all-expenses`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Add the accessToken in the Authorization header
        },
      });

      return response.data; // Return the list of all expenses
    } catch (error) {
      console.error(
        "Error fetching all expenses:",
        error.response?.data || error
      );
      throw error.response?.data || "Failed to fetch expenses";
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

      await axios.delete(`${API_URL}delete/${expenseId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Add the accessToken in the Authorization header
        },
      });

      console.log("Expense deleted successfully");
    } catch (error) {
      console.error("Error deleting expense:", error.response?.data || error);
      throw error.response?.data || "Failed to delete expense";
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

      const response = await axios.patch(
        `${API_URL}update/${expenseId}`,
        expensePartialData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Add the accessToken in the Authorization header
          },
        }
      );

      return response.data; // Return the updated expense data
    } catch (error) {
      console.error("Error updating expense:", error.response?.data || error);
      throw error.response?.data || "Failed to update expense";
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

      const response = await axios.get(
        `${API_URL}generate/invoice/${domainName}`,
        {
          params: { startYear, endYear, startMonth, endMonth, category },
          headers: {
            Authorization: `Bearer ${accessToken}`, // Add the accessToken in the Authorization header
          },
          responseType: "blob", // Set response type to blob for PDF download
        }
      );

      // Debugging to log response details
      console.log("Response received:", response);
      return response;
    } catch (error) {
      console.error(
        "Error generating expense invoice:",
        error.response?.data || error
      );
      throw error.response?.data || "Failed to generate invoice";
    }
  },
};

export default expenseService;
