import { Navigate } from "react-router-dom";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Login nahi hai
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // User data nahi hai
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role allowed nahi hai
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleBasedRoute;