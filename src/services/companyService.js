import axios from "axios";

const API_URL = "http://localhost:8080/company-service/";

// Axios instance with timeout configuration
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 50000, // Timeout set to 10 seconds for all requests
});

const companyService = {
  /**
   * Registers a new company.
   * @param {Object} companyData - The company details.
   * @param {string} accessToken - The access token for authorization.
   * @returns {Promise<Object>} - The registered company data.
   */
  registerCompany: async (companyData, accessToken) => {
    try {
      console.log("Registering company:", companyData);

      const response = await axiosInstance.post(
        `${API_URL}register`,
        companyData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Add the accessToken here in the Authorization header
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Company registration error:",
        error.response?.data || error
      );
      throw error.response?.data || "Company registration failed";
    }
  },

  /**
   * Fetches company details by domain name.
   * @param {string} domain - The company's domain name.
   * @param {string} accessToken - The access token for authorization.
   * @returns {Promise<Object>} - The company details.
   */
  getCompanyByDomain: async (domain, accessToken) => {
    try {
      console.log("Fetching company details for domain:", domain);

      const response = await axiosInstance.get(
        `${API_URL}domain-name/${domain}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Add the accessToken in the Authorization header
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching company details:",
        error.response?.data || error
      );
      throw error.response?.data || "Failed to fetch company details";
    }
  },
};

export default companyService;
