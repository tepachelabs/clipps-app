import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import { selectIsAuthenticated } from "../../reducers";

interface RequireAuthProps {
  children: JSX.Element;
  fallbackComponent?: React.FC;
  redirectTo?: string;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({
  children,
  fallbackComponent: Component,
  redirectTo = "/login",
}: RequireAuthProps) => {
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated && Component) {
    return <Component />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children;
};
