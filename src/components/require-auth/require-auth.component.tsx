import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import { selectIsAuthenticated } from "../../reducers";

interface RequireAuthProps {
  children: JSX.Element;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }: RequireAuthProps) => {
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
