import { createContext, useEffect, useState } from "react";
import authService from "../services/authService";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Retrieve and parse user and userProfile from localStorage, or set them to null if not found
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [userProfile, setUserProfile] = useState(() => {
    const storedUserProfile = localStorage.getItem("userProfile");
    return storedUserProfile ? JSON.parse(storedUserProfile) : null;
  });

  // Sync changes to user and userProfile with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // Save user with tokens
    }
    if (userProfile) {
      localStorage.setItem("userProfile", JSON.stringify(userProfile)); // Save user profile
    }
  }, [user, userProfile]);

  const login = async (email, password) => {
    try {
      const response = await authService.login({ email, password });
      const { accessToken, refreshToken } = response; // Get tokens from response

      try {
        const userResponse = await authService.getUser(email, accessToken);
        if (userResponse) {
          // Create a user object with accessToken and refreshToken
          const userWithTokens = {
            accessToken,
            refreshToken,
          };

          setUser(userWithTokens); // Store the user data including tokens

          // Create user profile
          const localUserProfile = {
            id: userResponse.id,
            fullName: userResponse.fullName,
            email: userResponse.email,
            phone: userResponse.phone,
            role: userResponse.role,
          };

          setUserProfile(localUserProfile); // Set user profile
        }
      } catch (error) {
        console.log("Error while fetching user details by email:", error);
      }

      return response; // Return response for further use
    } catch (error) {
      console.error("Login error:", error);
      throw error; // Re-throw the error for further handling
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      const { accessToken, refreshToken } = response; // Get tokens from registration response

      if (response && accessToken) {
        try {
          const userResponse = await authService.getUser(
            userData.email,
            accessToken
          );
          if (userResponse) {
            const userWithTokens = {
              accessToken,
              refreshToken,
            };

            setUser(userWithTokens); // Store user data including tokens

            const localUserProfile = {
              id: userResponse.id,
              fullName: userResponse.fullName,
              email: userResponse.email,
              phone: userResponse.phone,
              role: userResponse.role,
            };

            setUserProfile(localUserProfile); // Store user profile
          }
        } catch (error) {
          console.log(
            "Error while fetching user details after registration:",
            error
          );
        }
      }

      return response; // Return response to be handled elsewhere
    } catch (error) {
      console.error("Registration error:", error);
      throw error; // Re-throw the error for handling
    }
  };

  const newEmployee = async (userData, currentAccessToken) => {
    try {
      console.log("accessToken newEmployee : ", currentAccessToken);
      await authService.newEmployee(userData, currentAccessToken);
    } catch (error) {
      console.error("Registration error:", error);
      throw error; // Re-throw the error for handling
    }
  };

  const logout = async () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const logOutRequest = {
      email: userProfile.email,
      accessToken: userData.accessToken,
    };
    try {
      const response = await authService.logout(logOutRequest);
      setUser(null);
      setUserProfile(null);
      localStorage.removeItem("user");
      localStorage.removeItem("userProfile");
      return response;
    } catch (error) {
      console.log("error inside auth-context : ", error);
      setUser(null);
      setUserProfile(null);
      localStorage.removeItem("user");
      localStorage.removeItem("userProfile");
    }
  };

  const updateUserProfile = async (emailId, userData, currentAccessToken) => {
    try {
      console.log("accessToken updateUserProfile : ", currentAccessToken);
      const response = await authService.updateUserProfile(
        emailId,
        userData,
        currentAccessToken
      );
      console.log("after updating user : ", response);
      const { accessToken, refreshToken } = response.data; // Get tokens from registration response
      console.log("from response accessToken : ", accessToken);
      console.log("from response refresshToken : ", refreshToken);
      if (response && accessToken) {
        try {
          const userResponse = await authService.getUser(
            userData.email,
            accessToken
          );
          console.log("userResponse after updating : ", userResponse);
          if (userResponse) {
            const userWithTokens = {
              accessToken,
              refreshToken,
            };

            setUser(userWithTokens); // Store user data including tokens

            const localUserProfile = {
              id: userResponse.id,
              fullName: userResponse.fullName,
              email: userResponse.email,
              phone: userResponse.phone,
              role: userResponse.role,
            };

            setUserProfile(localUserProfile); // Store user profile
          }
        } catch (error) {
          console.log(
            "Error while fetching user details after registration:",
            error
          );
        }
      }

      return response; // Return response to be handled elsewhere
    } catch (error) {
      console.error("Registration error:", error);
      throw error; // Re-throw the error for handling
    }
  };
  // Function to get the user role
  const getUserRole = () => {
    if (userProfile && userProfile.role) {
      return userProfile.role; // Return the role from userProfile
    } else {
      return null; // Return null if no profile or role is found
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        getUserRole,
        login,
        register,
        newEmployee,
        updateUserProfile,
        logout,
        setUser,
        userProfile,
        setUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
