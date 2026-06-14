import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const isAdminPage = location.pathname.startsWith('/admin') || location.pathname.startsWith('/edit');

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
      
      // Clear any cached frontend state to prevent automatic redirects
      localStorage.clear();
      sessionStorage.clear();
      
      navigate('/');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleAdminClick = async () => {
    try {
      await axios.get(`${API_URL}/api/auth/verify`, { 
        withCredentials: true,
        // Prevent browser from caching a previous successful login
        headers: { 'Cache-Control': 'no-cache' } 
      });
      navigate('/adminHome');
    } catch (error) {
      navigate('/adminLogin');
    }
  };

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Brand */}
        <Link to="/" className="text-xl font-bold text-cyan-800">Srijan Ponaganti</Link>

        {/* PUBLIC LINKS */}
        <div className="flex gap-4 md:gap-6">
          <Link to="/" className="text-slate-700 font-medium hover:text-cyan-700 transition-colors">About</Link>
          <Link to="/education" className="text-slate-700 font-medium hover:text-cyan-700 transition-colors">Education</Link>
          <Link to="/skills" className="text-slate-700 font-medium hover:text-cyan-700 transition-colors">Skills</Link>
          <Link to="/projects" className="text-slate-700 font-medium hover:text-cyan-700 transition-colors">Projects</Link>
          <Link to="/achievements" className="text-slate-700 font-medium hover:text-cyan-700 transition-colors">Achievements</Link>
          <Link to="/position" className="text-slate-700 font-medium hover:text-cyan-700 transition-colors">Positions</Link>
        </div>

        {/* DYNAMIC ADMIN BUTTON */}
        {isAdminPage ? (
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-all"
          >
            <LogOut size={18} /> Logout
          </button>
        ) : (
          <button 
            onClick={handleAdminClick} 
            className="w-10 h-10 rounded-full border-2 border-slate-200 overflow-hidden hover:border-cyan-500 transition-all"
          >
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" className="w-full h-full object-cover" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;