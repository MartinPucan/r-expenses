import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/Auth/AuthContext';
import { PATH } from '../constants/routes';

interface IProps {
  children: JSX.Element;
}

export const ProtectedRoute: React.FC<IProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return children;
};
