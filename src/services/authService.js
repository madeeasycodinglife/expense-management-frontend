import axios from "axios";

const API_URL = "http://localhost:8080/auth-service/";

const authService = {
  register: async (userData) => {
    try {
      console.log("Registering user:", userData);
      userData.role = "ADMIN";
      const response = await axios.post(`${API_URL}sign-up`, userData);
      return response.data;
    } catch (error) {
      console.error("Registration error:", error.response?.data || error);
      throw error.response?.data || "Registration failed";
    }
  },
  newEmployee: async (userData, accessToken) => {
    try {
      console.log("userData : ", userData);
      const response = await axios.post(`${API_URL}sign-up`, userData, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Add the accessToken here in the Authorization header
        },
      });
      return response.data;
    } catch (error) {
      console.error("Registration error:", error.response?.data || error);
      throw error.response?.data || "Registration failed";
    }
  },
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}sign-in`, credentials);
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error);
      throw error.response?.data || "Login failed";
    }
  },

  logout: async (logOutRequest) => {
    try {
      const response = await axios.post(`${API_URL}log-out`, logOutRequest);
      console.log("response inside authService : ", response);

      return response;
    } catch (error) {
      console.error("Logout error:", error.response?.data || error);
      throw error.response?.data || "Logout failed";
    }
  },

  validateToken: async (accessToken) => {
    try {
      const response = await axios.post(
        `${API_URL}validate-access-token/${accessToken}`
      );
      return response.data;
    } catch (error) {
      console.error("Token validation error:", error.response?.data || error);
      throw error.response?.data || "Invalid token";
    }
  },
  getUser: async (emailId, token) => {
    try {
      const response = await axios.get(`${API_URL}get-user/${emailId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      });
      return response.data; // Return user data on success
    } catch (error) {
      console.error("Get User error:", error.response?.data || error);
      throw error.response?.data || "Failed to fetch user";
    }
  },
  updateUserProfile: async (emailId, userData, accessToken) => {
    try {
      const response = await axios.patch(
        `${API_URL}partial-update/${emailId}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Update error:", error.response?.data || error);
      throw error.response?.data || "Update failed";
    }
  },
};

export default authService;
