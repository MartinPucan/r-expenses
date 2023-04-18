import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './contexts/Auth/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import Homepage from './routes/Homepage';
import { PATH } from './routes/constants/routes';
import { Authentication } from './routes/Authentication';

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
