import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import authService from "../services/authService";

const PrivateRoute = ({ children }) => {
  const { user, setUser, setUserProfile } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const validateUserToken = async () => {
      if (user && user.accessToken) {
        try {
          const response = await authService.validateToken(user.accessToken);
          console.log("Token validation response:", response);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Token validation error:", error);

          if (error.response) {
            setUser(null);
            localStorage.removeItem("user");
            setUserProfile(null);
            localStorage.removeItem("userProfile");
          }
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    validateUserToken();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show loading state while checking auth
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
