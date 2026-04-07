// ProtectedRoute.jsx with Axios
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    axios
      .get("http://localhost:5000/api/verify", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setIsAuthenticated(true))
      .catch(() => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      });
  }, [token]);

  if (isAuthenticated === null) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
