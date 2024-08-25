import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

type PrivateRouteProps = {
  redirectPath?: string;
  children?: React.ReactNode;
  isAuthenticated?: boolean;
};

//redirectPath = "/signin",
export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return !isAuthenticated ? <Navigate to={"/"} replace /> : <>{children}</>;
  }

  return <Outlet />;
};
