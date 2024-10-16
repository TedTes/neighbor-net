import React, { useContext } from "react";
import { AuthContext } from "../contexts";
type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
