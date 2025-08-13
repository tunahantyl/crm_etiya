import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import type { ReactElement } from 'react';

interface ProtectedRouteProps {
  element: ReactElement;
  allowedRoles?: ('ADMIN' | 'MANAGER' | 'USER')[];
}

const ProtectedRoute = ({ element, allowedRoles = [] }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role || 'USER')) {
    return <Navigate to="/unauthorized" replace />;
  }

  return element;
};

export default ProtectedRoute;