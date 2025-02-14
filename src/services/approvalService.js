import axios from "axios";

const API_URL = "http://localhost:8080/approval-service/";

// Axios instance with timeout configuration
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 20000, // Timeout set to 10 seconds for all requests
});

const approvalService = {
  /**
   * Requests approval for an expense.
   * @param {Object} expenseRequestData - The expense approval request data.
   * @param {string} accessToken - The access token for authorization.
   * @returns {Promise<Object>} - The response from the approval request.
   */
  askForApproval: async (expenseRequestData, accessToken) => {
    try {
      console.log("Requesting approval:", expenseRequestData);
      const response = await axiosInstance.post(
        `${API_URL}ask-for-approve`,
        expenseRequestData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Approval request response:", response);
      return response.data;
    } catch (error) {
      console.error("Approval request error:", error.response?.data || error);
      throw error.response?.data || "Approval request failed";
    }
  },

  /**
   * Fetches approval records for a given company domain.
   * @param {string} companyDomain - The company's domain name.
   * @param {Object} filters - Optional filters like startYear, endYear, etc.
   * @param {string} accessToken - The access token for authorization.
   * @returns {Promise<Array>} - The list of approvals.
   */
  getApprovals: async (companyDomain, filters = {}, accessToken) => {
    try {
      console.log(
        "Fetching approvals for:",
        companyDomain,
        "with filters:",
        filters
      );

      console.log("approval with accessToken : ", accessToken);
      const { startYear, endYear, startMonth, endMonth } = filters;

      const response = await axiosInstance.get(
        `${API_URL}get-approvals/${companyDomain}`,
        {
          params: { startYear, endYear, startMonth, endMonth },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching approvals:", error.response?.data || error);
      throw error.response?.data || "Failed to fetch approvals";
    }
  },
};

export default approvalService;
