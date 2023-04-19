import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './contexts/Auth/AuthContext';
import { ProtectedRoute } from './pages/ProtectedRoute';
import Homepage from './pages/Homepage';
import { PATH } from './constants/routes';
import { Authentication } from './pages/Authentication';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={PATH.LOGIN} element={<Authentication />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Homepage />
          </ProtectedRoute>
        }
      />
    </>,
  ),
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
