// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");

  // Check if the token exists
  if (!token) {
    return <Navigate to="/" replace />; // Redirect to login if no token
  }

  try {
    const decodedToken = jwtDecode(token); // Decode the token
    const userRole = decodedToken.role;

    // Check if user role exists and is allowed
    if (!userRole || !allowedRoles.includes(userRole)) {
      return <Navigate to="/" replace />; // Redirect if not authorized
    }
  } catch (error) {
    console.error("Token validation error:", error);
    return <Navigate to="/" replace />; // Redirect if token is invalid
  }

  return children; // Render the protected component
};

export default ProtectedRoute;
