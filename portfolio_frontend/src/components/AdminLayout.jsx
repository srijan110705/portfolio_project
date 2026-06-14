import React from 'react';
import { Outlet } from 'react-router-dom';
import NavAdmin from './NavAdmin';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* The new button-style Admin Navigation */}
        <NavAdmin />
        
        {/* The active Admin Page loads inside this white box */}
        <main className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 min-h-125">
          <Outlet /> 
        </main>
        
      </div>
    </div>
  );
};

export default AdminLayout;