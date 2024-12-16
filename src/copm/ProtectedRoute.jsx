// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = jwtDecode(token);

  // Check if user role exists and is allowed
  if (!role.role || !allowedRoles.includes(role.role)) {
    return <Navigate to="/" />; // Redirect to login if not authorized
  }

  return children; // Render the protected component
};

export default ProtectedRoute;
