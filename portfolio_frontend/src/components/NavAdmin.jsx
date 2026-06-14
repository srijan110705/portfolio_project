import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavAdmin = () => {
  const location = useLocation();

  // Helper function to style the active button differently
  const getButtonClass = (path) => {
    return location.pathname === path
      ? "bg-cyan-700 text-white px-4 py-2 rounded-lg shadow-md font-medium transition-all"
      : "bg-white text-slate-600 border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 hover:text-cyan-700 font-medium transition-all shadow-sm";
  };

  return (
    <div className="flex flex-wrap gap-3 mb-8 p-4 bg-slate-50/50 rounded-xl border border-slate-100">
      <Link to="/adminHome" className={getButtonClass("/adminHome")}>Dashboard</Link>
      <Link to="/edit_about" className={getButtonClass("/edit_about")}>About</Link>
      <Link to="/edit_achievements" className={getButtonClass("/edit_achievements")}>Achievements</Link>
      <Link to="/edit_education" className={getButtonClass("/edit_education")}>Education</Link>
      <Link to="/edit_position" className={getButtonClass("/edit_position")}>Positions</Link>
      <Link to="/edit_projects" className={getButtonClass("/edit_projects")}>Projects</Link>
      <Link to="/edit_skills" className={getButtonClass("/edit_skills")}>Skills</Link>
    </div>
  );
};

export default NavAdmin;