import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  // Define dynamic API_URL
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const formData = { email, password };

    // Use dynamic API_URL here
    axios.post(`${API_URL}/api/auth/login`, formData, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true 
    })
    .then((res) => {
      navigate("/adminHome");
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        setError("Incorrect email or password.");
      } else {
        setError("Server error. Please try again later.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">Admin Login</h2>
        
        {/* Error message display */}
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email ID</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
              placeholder="admin@example.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-cyan-700 text-white font-semibold py-2.5 rounded-lg hover:bg-cyan-800 transition-colors mt-2"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;