import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AdminPanel from "./components/admin/AdminPanel";
import PrivateRoute from "./routes/PrivateRoute"; // Import PrivateRoute
import NotFound from "./pages/NotFound";
import { AuthContext } from "./context/AuthContext";
import EmployeePanel from "./components/employee/EmployeePanel";
import ManagerPanel from "./components/manager/ManagerPanel";
import FinancePanel from "./components/finance/FinancePanel";
const App = () => {
  const { user, getUserRole } = useContext(AuthContext);
  const role = getUserRole()?.toLowerCase(); // Convert role to lowercase to make it case-insensitive
  useEffect(() => {
    console.log("app rendered.. role : ", role);
  }, [user]);

  // Determine which panel to render based on the role
  const getDashboardComponent = () => {
    switch (role) {
      case "admin":
        return <AdminPanel />;
      case "employee":
        return <EmployeePanel />;
      case "finance":
        return <FinancePanel />;
      case "manager":
        return <ManagerPanel />;
      default:
        return <NotFound />;
    }
  };
  return (
    <>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Correct Private Route */}
        <Route
          path="/dashboard"
          element={<PrivateRoute>{getDashboardComponent()}</PrivateRoute>}
        />

        {/* Redirect to 404 if no matching route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
