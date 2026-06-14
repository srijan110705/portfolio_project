import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, Shield, Calendar, Briefcase } from 'lucide-react';

const Position = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/api/edit/get_positions`)
      .then((res) => {
        setPositions(res.data.positions || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching positions:", err);
        setError('Failed to load positions of responsibility.');
        setLoading(false);
      });
  }, [API_URL]);

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">
      <Loader2 className="animate-spin" size={40} />
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center text-red-500 p-4 text-center">
      <p>{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 flex items-center justify-center gap-3">
            <Shield className="text-cyan-600" size={36} /> Positions of Responsibility
          </h2>
        </div>

        {positions.length === 0 ? (
          <div className="text-center text-slate-500 bg-white p-10 rounded-2xl border">No positions found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {positions.map((pos) => (
              <div key={pos._id} className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col group">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-cyan-50 text-cyan-600 rounded-xl"><Briefcase size={24} /></div>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">{pos.title}</h3>
                </div>
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 px-3 py-1 text-sm rounded-full font-medium">
                    <Calendar size={14} /> {pos.duration}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed flex-1">{pos.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Position;