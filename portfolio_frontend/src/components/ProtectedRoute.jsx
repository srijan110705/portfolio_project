import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = () => {
  // Use the environment variable, fallback to localhost for local development
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Ping the backend using the dynamic API_URL
    axios.get(`${API_URL}/api/auth/verify`, {
      withCredentials: true // Crucial: This sends the cookie to the backend
    })
    .then((res) => {
      setIsAuthenticated(true);
    })
    .catch((err) => {
      // If the backend returns an error, they aren't logged in
      setIsAuthenticated(false);
    });
  }, [API_URL]); // Added API_URL as a dependency

  // Show a loading spinner while waiting for the backend to respond
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-cyan-600" size={40} />
      </div>
    );
  }

  // If verified, render the Admin pages (<Outlet />). If not, redirect to Login.
  return isAuthenticated ? <Outlet /> : <Navigate to="/adminLogin" replace />;
};

export default ProtectedRoute;