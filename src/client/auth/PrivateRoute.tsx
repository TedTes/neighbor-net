import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  element: React.ReactElement;
  isAuthenticated: () => boolean;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  isAuthenticated,
}): React.ReactElement => {
  const location = useLocation();
  return isAuthenticated() ? (
    element
  ) : (
    <Navigate to="/signIn" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
